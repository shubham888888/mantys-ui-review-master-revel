import log from 'loglevel';
import {all, call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import {getHeaderConfigForToken, post} from '../../commons/utils/connectionUtils';
import {
	getFiltersFromResponse,
	getLayout,
	getLayoutFromData,
	getRequestBodyFromFilters
} from '../../commons/utils/viewsUtils';
import {CHANGE_FILTER_VALUE, GET_DASHBOARD_DATA, UPDATE_LAYOUT, VIEW_POINT_IN_TIME} from '../actions/actionConstants';
import {API_FAILED, API_IN_PROGRESS, API_SUCCESS} from '../actions/common/apiStatusConstants';
import {setDashboardApiStatus, setDashboardData, setFilters} from '../actions/dashboardActions';
import {setCurrView} from '../actions/viewsActions';

function* updateLayout(action) {
	try {
		const {layout, id} = action.payload;
		const url = `/view/${id}/saveLayout`;
		const token = yield select((state) => state.auth.userDetails.jwtToken);
		const body = {};
		layout.forEach((layoutItem) => {
			body[layoutItem.i] = layoutItem;
		});
		yield call(post, url, body, getHeaderConfigForToken(token));
	} catch (e) {
		log.error(e);
	}
}

function* getDashboardData(action) {
	try {
		yield put(setDashboardApiStatus(API_IN_PROGRESS));
		const {id, token, appliedFilters, pointInTimeStatus} = action.payload;
		const url = `/view/${id}/getConfig`;

		if (!id) {
			return;
		}

		let {filterValues, body} = getRequestBodyFromFilters(appliedFilters, pointInTimeStatus);
		let filterBody = {...body};
		if (filterValues.month !== 'Custom') {
			filterBody = {...filterBody, fetchFilters: true};
		}
		let response = yield call(post, url, filterBody, getHeaderConfigForToken(token));
		let filters = getFiltersFromResponse(response, filterValues);
		const newFilterValuesAndBody = getRequestBodyFromFilters(filters, pointInTimeStatus);

		if (filterValues.month !== 'Custom') {
			filterValues = newFilterValuesAndBody.filterValues;
			body = newFilterValuesAndBody.body;
			response = yield call(post, url, body, getHeaderConfigForToken(token));
			filters = getFiltersFromResponse(response, filterValues);
		}

		response.data = getLayoutFromData(response.view_layout);
		response.layout = getLayout(response.view_layout);

		yield all([
			yield put(setDashboardData(response)),
			yield put(setFilters(filters)),
			yield put(setCurrView(response))
		]);
		yield put(setDashboardApiStatus(API_SUCCESS));
	} catch (e) {
		yield put(setDashboardApiStatus(API_FAILED));
		log.error(e);
	}
}

function* changeFilterValue(action) {
	const {filters, id, updatedValue} = action.payload;
	const newFilters = filters.map((filterItem) => {
		if (filterItem.filterId === id) return {...filterItem, value: updatedValue};
		return {...filterItem};
	});

	yield put(setFilters(newFilters));
}

function* viewPointInTime(action) {
	const {filters} = action.payload;
	const newFilters = filters.map((filterItem) => {
		filterItem.value = '';
		filterItem.allowedValues = filterItem.allowedValues.filter((value) => !value.includes('-'));
		return filterItem;
	});
	yield put(setFilters(newFilters));
}

export default function* dashboardSaga() {
	yield all([
		takeEvery(UPDATE_LAYOUT, updateLayout),
		takeLatest(GET_DASHBOARD_DATA, getDashboardData),
		takeEvery(CHANGE_FILTER_VALUE, changeFilterValue),
		takeLatest(VIEW_POINT_IN_TIME, viewPointInTime)
	]);
}
