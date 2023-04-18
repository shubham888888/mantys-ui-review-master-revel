import {REDIRECT, SET_API_STATUS} from '../actionConstants';

export const redirect = (url) => {
	return {
		type: REDIRECT,
		payload: {url}
	};
};

export const setApiStatus = (status) => {
	return {
		type: SET_API_STATUS,
		payload: {status}
	};
};
