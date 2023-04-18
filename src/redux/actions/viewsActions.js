import {GET_VIEWS_DATA, SET_CURR_VIEW, SET_VIEWS_DATA} from './actionConstants';

export const getViewsData = (authToken) => {
	return {
		type: GET_VIEWS_DATA,
		payload: {token: authToken}
	};
};

export const setViewsData = (data) => {
	return {
		type: SET_VIEWS_DATA,
		payload: data
	};
};

export const setCurrView = (data) => {
	return {
		type: SET_CURR_VIEW,
		payload: {data}
	};
};
