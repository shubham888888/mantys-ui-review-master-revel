import {
	SET_REPORTS_API_STATUS,
	SET_REPORTS_DATA_IN_REDUCER,
	SET_REPORTS_FILTERS,
	SET_REPORTS_POINT_IN_TIME_STATUS,
	SET_ROW_CLICK_DATA
} from '../actions/actionConstants';

const initialState = {
	data: [],
	filters: null,
	pointInTimeStatus: null,
	reportsApiStatus: null,
	rowClickData: '',
	editableFields: [],
	fieldValues: {}
};

export default function reportsReducer(state = initialState, action) {
	switch (action.type) {
		case SET_REPORTS_DATA_IN_REDUCER:
			return {...state, ...action.payload};
		case SET_REPORTS_FILTERS:
			return {...state, filters: action.payload.filters};
		case SET_REPORTS_POINT_IN_TIME_STATUS:
			return {...state, pointInTimeStatus: action.payload.status};
		case SET_REPORTS_API_STATUS:
			return {...state, reportsApiStatus: action.payload.status};
		case SET_ROW_CLICK_DATA:
			return {...state, rowClickData: action.payload.fileData};
		default:
			return state;
	}
}
