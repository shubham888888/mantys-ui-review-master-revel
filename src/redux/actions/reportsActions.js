import {
	GET_REPORTS_DATA_BY_ID,
	GET_ROW_CLICK_DATA,
	INITIALIZE_REPORTS_FILTERS,
	SET_REPORTS_API_STATUS,
	SET_REPORTS_DATA_IN_REDUCER,
	SET_REPORTS_FILTERS,
	SET_REPORTS_POINT_IN_TIME_STATUS,
	SET_ROW_CLICK_DATA,
	UPDATE_ASSUMPTIONS,
	UPDATE_REPORTS_FILTER_VALUE
} from './actionConstants';

export const getDataById = (id, token, filters, pointInTimeStatus, queryParamFilters) => {
	return {
		type: GET_REPORTS_DATA_BY_ID,
		payload: {id, token, appliedFilters: filters, pointInTimeStatus, queryParamFilters}
	};
};

export const setReportsApiStatus = (status) => {
	return {
		type: SET_REPORTS_API_STATUS,
		payload: {status}
	};
};

export const initializeReportsFilters = () => {
	return {
		type: INITIALIZE_REPORTS_FILTERS
	};
};

export const setReportsFilters = (filters) => {
	return {
		type: SET_REPORTS_FILTERS,
		payload: {filters}
	};
};

export const setReportsPointInTimeStatus = (status) => {
	return {
		type: SET_REPORTS_POINT_IN_TIME_STATUS,
		payload: {status}
	};
};

export const updateReportsFilterValue = (filters, filterId, updatedValue) => {
	return {
		type: UPDATE_REPORTS_FILTER_VALUE,
		payload: {filters, id: filterId, updatedValue}
	};
};

export const setReportsDataInReducer = (data) => {
	return {
		type: SET_REPORTS_DATA_IN_REDUCER,
		payload: data
	};
};

export const getRowClickData = (transactionType, id, entity) => {
	return {
		type: GET_ROW_CLICK_DATA,
		payload: {transactionType, id, entity}
	};
};

export const setRowClickData = (fileData) => {
	return {
		type: SET_ROW_CLICK_DATA,
		payload: {fileData}
	};
};

export const updateAssumptions = (objectId, payload) => {
	return {
		type: UPDATE_ASSUMPTIONS,
		payload: {
			objectId,
			payload
		}
	};
};
