import _ from 'lodash';
import log from 'loglevel';
import moment from 'moment/moment';
import {toast} from 'react-toastify';
import {all, call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {read, utils} from 'xlsx';
import {getPrevUploadByNameAPI} from '../../commons/apiConstants';

import {PAGE_LINKS} from '../../commons/constants';
import {get, getHeaderConfigForToken, post} from '../../commons/utils/connectionUtils';
import {cleanUploadedData, getFileNameByTemplateVersion} from '../../commons/utils/fileImportUtils';
import {getDataFromSheetArray, parseMergedCells} from '../../commons/utils/SheetUtils';
import {GET_FILE_DATA, GET_TEMPLATE_OPTIONS, UPLOAD_FILE, UPLOAD_FILE_FORCED} from '../actions/actionConstants';
import {API_FAILED, API_IN_PROGRESS, API_SUCCESS, FETCHING_TEMPLATES} from '../actions/common/apiStatusConstants';
import {redirect} from '../actions/common/commonActions';
import {
	setFileData,
	setFileImportApiStatus,
	setLoading,
	setTemplateOptions,
	toggleModal
} from '../actions/fileImportActions';

function* getFileDataAndSave(action) {
	try {
		const {e, headerCount, skipRows} = action.payload;
		if (!_.isEmpty(e.target?.files)) {
			yield put(setLoading(true));
			const file = e.target.files[0];
			const buffer = yield call(async () => await file.arrayBuffer());
			const wb = read(buffer);
			parseMergedCells(wb);
			const ws = wb.Sheets[wb.SheetNames[0]];
			// Reading the sheet in an array format to parse multiple headers
			const dataArray = utils.sheet_to_json(ws, {header: 1, raw: false, defval: '', blankrows: false});
			const data = getDataFromSheetArray(dataArray, headerCount);
			yield put(setFileData(data));
		}
	} catch (error) {
		log.error(error);
		toast.error('File could not be imported');
	} finally {
		yield put(setLoading(false));
	}
}

function* fetchTemplatesOptionsAndSave(action) {
	try {
		yield put(setFileImportApiStatus(FETCHING_TEMPLATES, API_IN_PROGRESS));
		const {token} = action.payload;
		const url = '/files/templates';
		const res = yield call(get, url, token);
		const templateOptions = res.map((item) => {
			return {...item};
		});

		yield put(setTemplateOptions(templateOptions));
		yield put(setFileImportApiStatus(FETCHING_TEMPLATES, API_SUCCESS));
	} catch (e) {
		yield put(setFileImportApiStatus(FETCHING_TEMPLATES, API_FAILED));
		log.error(e);
	}
}

// TODO : Simplify the design from UI and backend
function* uploadFileData(action) {
	try {
		const {template, version, fileData, token} = action.payload;
		const cleanData = cleanUploadedData(template, fileData);
		const fileName = getFileNameByTemplateVersion(template.label, version);

		// TODO test for the configuration and uncomment
		// const dataValidity = isValidUploadedData(cleanData, template);
		// if (!dataValidity) {
		// 	return toast.error('Please resolve the errors before uploading');
		// }

		const vtBegin = moment(version, 'MMM YYYY').format('yyyy-MM-DD');
		const vtEnd = moment(version, 'MMM YYYY').add(1, 'M').format('yyyy-MM-DD');
		const body = {
			data: cleanData,
			name: fileName,
			importTemplateId: template.id,
			fileExtensions: 'xlsx',
			version,
			vtBegin,
			vtEnd
		};

		// check if user can upload the file
		let url = `/files/imports/${fileName}/check`;
		const fileExists = yield call(get, url, token);
		if (fileExists) {
			yield put(toggleModal());
		} else {
			url = `/files/import?forced=false`;
			yield call(post, url, body, getHeaderConfigForToken(token));
			const uploadedFileUrl = getPrevUploadByNameAPI(fileName);
			const uploadedFile = yield call(get, uploadedFileUrl, token);

			yield put(redirect(PAGE_LINKS.IMPORT_STATUS + '/' + uploadedFile.id));
			yield put(toggleModal());
			toast.success('File Uploaded Successfully');
		}
	} catch (e) {
		log.error(e);
		toast.error('File could not be uploaded');
	}
}

function* uploadFileDataForced(action) {
	try {
		const {template, version, fileData, token} = action.payload;
		const cleanData = cleanUploadedData(template, fileData);
		const url = '/files/import?forced=true';

		// TODO handle this for other frequency apart from monthly
		const startDate = moment(version, 'MMM YYYY');
		const vtBegin = startDate.format('yyyy-MM-DD');
		const vtEnd = startDate.add(1, 'M').format('yyyy-MM-DD');
		const fileName = getFileNameByTemplateVersion(template.label, version);

		const body = {
			data: cleanData,
			importTemplateId: template.id,
			fileExtensions: 'xlsx',
			name: fileName,
			version,
			vtBegin,
			vtEnd
		};

		yield call(post, url, body, getHeaderConfigForToken(token));
		const uploadedFileUrl = getPrevUploadByNameAPI(fileName);
		const uploadedFile = yield call(get, uploadedFileUrl, token);
		yield put(redirect(PAGE_LINKS.IMPORT_STATUS + '/' + uploadedFile.id));
		yield put(toggleModal());
		toast.success('File Uploaded Successfully');
	} catch (error) {
		log.error(error);
		yield put(toggleModal());
		toast.error('File could not be uploaded');
	}
}

export default function* fileImportSaga() {
	yield all([
		yield takeEvery(GET_FILE_DATA, getFileDataAndSave),
		yield takeLatest(UPLOAD_FILE, uploadFileData),
		yield takeLatest(UPLOAD_FILE_FORCED, uploadFileDataForced),
		yield takeEvery(GET_TEMPLATE_OPTIONS, fetchTemplatesOptionsAndSave)
	]);
}
