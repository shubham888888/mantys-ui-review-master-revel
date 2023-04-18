import {GET_MODELS_DATA_BY_ID, SET_MODELS_DATA_IN_REDUCER} from './actionConstants';

export const getModelsDataById = (id, token) => {
	return {
		type: GET_MODELS_DATA_BY_ID,
		payload: {id, token}
	};
};

export const setModelsDataInReducer = (data) => {
	return {
		type: SET_MODELS_DATA_IN_REDUCER,
		payload: data
	};
};
