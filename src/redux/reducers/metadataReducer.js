import {SET_METADATA} from '../actions/actionConstants';

const initialState = {
	loading: false,
	currencyRates: [],
	filters: [],
	editorVisible: false
}

export default function (state = initialState, action) {
	switch (action.type) {
		case SET_METADATA:
			return {...state, ...action.payload};
		default:
			return state;
	}
}