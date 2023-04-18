import {
	SET_DASHBOARD_API_STATUS,
	SET_DASHBOARD_DATA,
	SET_FILTERS,
	SET_POINT_IN_TIME_STATUS
} from '../actions/actionConstants';

const initialState = {
	dashboardData: null,
	filters: null,
	apiStatus: null,
	pointInTimeStatus: false
};

export default function dashboardReducer(state = initialState, action) {
	switch (action.type) {
		case SET_DASHBOARD_DATA:
			return {...state, dashboardData: action.payload};
		case SET_FILTERS:
			return {...state, filters: action.payload.filters};
		case SET_DASHBOARD_API_STATUS:
			return {...state, apiStatus: action.payload.status};
		case SET_POINT_IN_TIME_STATUS: {
			return {...state, pointInTimeStatus: action.payload.status};
		}
		default:
			return state;
	}
}
