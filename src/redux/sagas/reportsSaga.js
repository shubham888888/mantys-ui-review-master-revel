import {isEmpty, isNil} from 'lodash';
import log from 'loglevel';
import {toast} from 'react-toastify';
import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import {getUpdateAssumptionsApi} from '../../commons/apiConstants';
import {get, getHeaderConfigForToken, post} from '../../commons/utils/connectionUtils';
import {
	getFiltersFromResponse,
	getFilterValueFromResponseAndQueryParams,
	getLayout,
	getLayoutFromData,
	getRequestBodyFromFilters
} from '../../commons/utils/viewsUtils';
import {
	GET_REPORTS_DATA_BY_ID,
	GET_ROW_CLICK_DATA,
	UPDATE_ASSUMPTIONS,
	UPDATE_REPORTS_FILTER_VALUE
} from '../actions/actionConstants';
import {API_FAILED, API_IN_PROGRESS, API_SUCCESS} from '../actions/common/apiStatusConstants';
import {setFilters} from '../actions/dashboardActions';
import {
	setReportsApiStatus,
	setReportsDataInReducer,
	setReportsFilters,
	setRowClickData
} from '../actions/reportsActions';
import {setCurrView} from '../actions/viewsActions';

function* getReportsDataById(action) {
	try {
		yield put(setReportsApiStatus(API_IN_PROGRESS));
		const {id, token, appliedFilters, pointInTimeStatus, queryParamFilters} = action.payload;
		const url = `/view/${id}/getConfig`;

		let {filterValues, body} = getRequestBodyFromFilters(appliedFilters, pointInTimeStatus);
		let requestBody;

		requestBody = {...body, ...queryParamFilters, fetchFilters: true};

		let response = yield call(post, url, requestBody, getHeaderConfigForToken(token));
		let filters = getFiltersFromResponse(response, filterValues);
		const newFilterValuesAndBody = getRequestBodyFromFilters(filters, pointInTimeStatus);

		filterValues = getFilterValueFromResponseAndQueryParams(
			newFilterValuesAndBody.filterValues,
			queryParamFilters,
			filters
		);
		body = newFilterValuesAndBody.body;
		body = {...body, ...queryParamFilters};
		response = yield call(post, url, body, getHeaderConfigForToken(token));
		filters = getFiltersFromResponse(response, filterValues);

		response.data = getLayoutFromData(response.view_layout);
		response.layout = getLayout(response.view_layout);

		const fieldValues = {};
		if (!isNil(response.view_inputs) && !isEmpty(response.view_layout[0].component_data)) {
			response.view_inputs.forEach((field) => {
				fieldValues[field.name] = response.view_layout[0].component_data[0][field.name];
			});
		}

		yield all([
			yield put(
				setReportsDataInReducer({
					data: response.data[0].value,
					// data: sampleData,
					columns: response.data[0].columns,
					// columns,
					fileName: response.name,
					hoverText: response.view_layout[0]?.component_config?.hoverText,
					connectedReportId: response.view_layout[0]?.component_config?.connectedReportId,
					clickGroupCells: response.view_layout[0]?.component_config?.clickGroupCells,
					colorGroupOnDifference: response.view_layout[0]?.component_config?.colorGroupOnDifference,
					columnGrouping: response.view_layout[0]?.component_config?.columnGrouping,
					groupedColumns: response.view_layout[0]?.component_config?.groupedColumns,
					editableFields: response.view_inputs,
					fieldValues: fieldValues
				})
			),
			yield put(setReportsFilters(filters))
		]);
		// TODO fix this structure

		yield put(setCurrView(response));
		yield put(setReportsApiStatus(API_SUCCESS));
	} catch (error) {
		log.error(error);
		yield put(setReportsApiStatus(API_FAILED));
	}
}

function* updateReportsFilterValue(action) {
	const {filters, id, updatedValue} = action.payload;
	const newFilters = filters.map((filterItem) => {
		if (filterItem.filterId === id) return {...filterItem, value: updatedValue};
		return {...filterItem};
	});
	yield put(setReportsFilters(newFilters));
}

function* viewReportPointInTime(action) {
	const {filters} = action.payload;
	const newFilters = filters.map((filterItem) => {
		filterItem.value = '';
		filterItem.allowedValues = filterItem.allowedValues.filter((value) => !value.includes('-'));
		return filterItem;
	});
	yield put(setFilters(newFilters));
}

function* getRowClickData(action) {
	try {
		let {transactionType, id, entity} = action.payload;
		//TODO :GET PDF DATA FROM API
		const url = `/view/${id}/customData?attr=pdf&type=${transactionType}&entity=${entity}`;
		const token = yield select((state) => state.auth.userDetails.jwtToken);
		yield put(setRowClickData({base64Data: null, contentType: null}));
		const response = yield call(get, url, token);
		yield put(setRowClickData({base64Data: response.data, contentType: response.content_type}));
	} catch (error) {
		yield put(setRowClickData({base64Data: '', contentType: ''}));
		toast.error('File does not exist for transaction.');
		log.error(error);
	}
}

function* updateAssumptions(action) {
	try {
		yield put(setReportsApiStatus(API_IN_PROGRESS));
		const {objectId, payload} = action.payload;
		const userDetails = yield select((state) => state.auth.userDetails);
		const response = yield call(
			post,
			getUpdateAssumptionsApi(objectId),
			payload,
			getHeaderConfigForToken(userDetails.jwtToken)
		);
		// TODO check for filters
		yield put(
			setReportsDataInReducer({
				data: response.view_layout[0].component_data
			})
		);
		yield put(setReportsApiStatus(API_SUCCESS));
		toast.success('Assumptions applied successfully');
	} catch (error) {
		yield put(setReportsApiStatus(API_FAILED));
		toast.error('Error occurred while forecasting');
		log.error(error);
	}
}

export default function* reportsSaga() {
	yield all([
		yield takeLatest(GET_REPORTS_DATA_BY_ID, getReportsDataById),
		yield takeLatest(UPDATE_REPORTS_FILTER_VALUE, updateReportsFilterValue),
		yield takeLatest(GET_ROW_CLICK_DATA, getRowClickData),
		yield takeLatest(UPDATE_ASSUMPTIONS, updateAssumptions)
	]);
}
