import {
	CHANGE_FILTER_VALUE,
	GET_DASHBOARD_DATA,
	SET_DASHBOARD_API_STATUS,
	SET_DASHBOARD_DATA,
	SET_FILTERS,
	SET_POINT_IN_TIME_STATUS,
	UPDATE_LAYOUT,
	VIEW_POINT_IN_TIME
} from './actionConstants';

export const getDashboardData = (id, token, filters, pointInTimeStatus) => {
	return {
		type: GET_DASHBOARD_DATA,
		payload: {id, token, appliedFilters: filters, pointInTimeStatus}
	};
};

export const setDashboardData = (data) => {
	return {
		type: SET_DASHBOARD_DATA,
		payload: data
	};
};

export const updateDashboardLayout = (layout, id) => {
	return {
		type: UPDATE_LAYOUT,
		payload: {id, layout}
	};
};

export const setDashboardApiStatus = (apiStatusValue) => {
	return {
		type: SET_DASHBOARD_API_STATUS,
		payload: {status: apiStatusValue}
	};
};

export const setFilters = (filters) => {
	return {
		type: SET_FILTERS,
		payload: {filters}
	};
};

export const setPointInTimeStatus = (status) => {
	return {type: SET_POINT_IN_TIME_STATUS, payload: {status}};
};

export const changeFilterValue = (filters, id, updatedValue) => {
	return {
		type: CHANGE_FILTER_VALUE,
		payload: {filters, id, updatedValue}
	};
};

export const viewPointInTimeData = (filters, pointInTimeStatus) => {
	return {
		type: VIEW_POINT_IN_TIME,
		payload: {pointInTimeStatus, filters}
	};
};
