import {all} from 'redux-saga/effects';
import analyticsSaga from './analyticsSaga';
import authSaga from './authSaga';
import dashboardSaga from './dashboardSaga';
import fileImportSaga from './fileImportSaga';
import metadataSaga from './metadataSaga';
import modelsSaga from './modelsSaga';
import planningSaga from './planningSaga';
import prevUploadsSaga from './prevUploadsSaga';
import reportsSaga from './reportsSaga';
import viewsSaga from './viewsSaga';

/**
 * App saga
 * @returns {Generator<*, void, *>}
 */

// Single entry point to start all Sagas at once
export default function* appSaga() {
	yield all([
		authSaga(),
		prevUploadsSaga(),
		fileImportSaga(),
		viewsSaga(),
		dashboardSaga(),
		reportsSaga(),
		modelsSaga(),
		analyticsSaga(),
		planningSaga(),
		metadataSaga()
	]);
}
