import {SET_CURR_VIEW, SET_VIEWS_DATA} from '../actions/actionConstants';

const initialState = {
	viewsDataList: null,
	currView: null
};

export const viewsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_VIEWS_DATA:
			return {...state, viewsDataList: action.payload};
		case SET_CURR_VIEW:
			return {...state, currView: action.payload.data};
		default:
			return state;
	}
};
