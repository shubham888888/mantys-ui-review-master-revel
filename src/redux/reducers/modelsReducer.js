import {SET_MODELS_DATA_IN_REDUCER} from '../actions/actionConstants';

const initialState = {
	modelData: null
};

export default function modelsReducer(state = initialState, action) {
	switch (action.type) {
		case SET_MODELS_DATA_IN_REDUCER:
			return {...state, modelData: action.payload};
		default:
			return state;
	}
}
