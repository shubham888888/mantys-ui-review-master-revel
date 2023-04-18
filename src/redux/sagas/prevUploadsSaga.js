import {isEmpty, uniqBy} from 'lodash';
import log from 'loglevel';
import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {getPrevUploadByIdAPI, getPrevUploadsApi} from '../../commons/apiConstants';
import {get} from '../../commons/utils/connectionUtils';
import {SET_CURR_SELECTED_UPLOAD, SHOW_MORE_UPLOADS} from '../actions/actionConstants';
import {API_FAILED, API_SUCCESS} from '../actions/common/apiStatusConstants';
import {setCurrPage, setPrevUploads, setUploadsApiStatus, updateCurrSelUpload} from '../actions/prevUploadsActions';

function* showMorePrevUploads(action) {
	try {
		const {page, step, currShownUploads, token} = action.payload;
		const offset = (page - 1) * step;
		const url = getPrevUploadsApi(offset);
		const response = yield call(get, url, token);
		let uploads = isEmpty(currShownUploads) ? response : currShownUploads.concat(response);
		uploads = uniqBy(uploads, (item) => item.id);
		yield all([yield put(setPrevUploads(uploads)), yield put(setCurrPage(page + 1))]);
		yield put(setUploadsApiStatus(API_SUCCESS));
	} catch (e) {
		yield put(setUploadsApiStatus(API_FAILED));
		log.error(e);
	}
}

function* findCurrSelectedUpload(action) {
	try {
		const {id, token, currShownUploads} = action.payload;
		const url = getPrevUploadByIdAPI(id);
		const response = yield call(get, url, token);
		if (isEmpty(response)) {
			yield put(updateCurrSelUpload(null));
			yield put(setUploadsApiStatus(API_SUCCESS));
			return;
		}

		let containsCurrUpload = false;
		currShownUploads.forEach((element) => {
			if (element.id.toString() === response.id.toString()) containsCurrUpload = true;
		});
		if (!containsCurrUpload) {
			// let uploads = currShownUploads.concat([{...response, data: null}]);
			let uploads = [{...response, data: null}].concat(currShownUploads);
			yield put(setPrevUploads(uploads));
		}
		yield all([yield put(updateCurrSelUpload(response))]);
		yield put(setUploadsApiStatus(API_SUCCESS));
	} catch (e) {
		yield put(setUploadsApiStatus(API_FAILED));
		log.error(e);
	}
}

export default function* prevUploadsSaga() {
	yield all([
		yield takeEvery(SHOW_MORE_UPLOADS, showMorePrevUploads),
		yield takeLatest(SET_CURR_SELECTED_UPLOAD, findCurrSelectedUpload)
	]);
}
