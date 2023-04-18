import {REDIRECT, SET_API_STATUS} from '../actions/actionConstants';

const initialState = {
	redirectUrl: null,
	apiStatus: null
};

export function commonReducer(state = initialState, action) {
	switch (action.type) {
		case REDIRECT: {
			return {...state, redirectUrl: action.payload.url};
		}
		case SET_API_STATUS:
			return {...state, apiStatus: action.payload.status};
		default:
			return state;
	}
}
