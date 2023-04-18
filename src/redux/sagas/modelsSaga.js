import log from 'loglevel';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import {getHeaderConfigForToken, post} from '../../commons/utils/connectionUtils';
import {GET_MODELS_DATA_BY_ID} from '../actions/actionConstants';
import {setModelsDataInReducer} from '../actions/modelsActions';

function* getModelsDataById(action) {
	try {
		const {id, token} = action.payload;
		const url = `/view/${id}/getConfig`;

		const response = yield call(
			post,
			url,
			{
				startDate: '2022-09-01T00:00:00.000Z',
				endDate: '2022-10-01T00:00:00.000Z'
			},
			getHeaderConfigForToken(token)
		);

		yield put(setModelsDataInReducer(null));
	} catch (error) {
		log.error(error);
	}
}

export default function* modelsSaga() {
	yield all([takeLatest(GET_MODELS_DATA_BY_ID, getModelsDataById)]);
}
