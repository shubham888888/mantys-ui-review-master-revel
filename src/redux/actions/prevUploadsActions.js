import {
	SET_CURR_PAGE,
	SET_CURR_SELECTED_UPLOAD,
	SET_PREV_UPLOADS,
	SET_UPLOADS_API_STATUS,
	SHOW_MORE_UPLOADS,
	UPDATE_CURR_SELECTED_UPLOAD
} from './actionConstants';

export const getPrevUploads = (step, token) => {
	return {
		type: SHOW_MORE_UPLOADS,
		payload: {step, page: 1, token}
	};
};

export const showMorePrevUploads = (step = 5, page = 2, token, currShownUploads) => {
	return {
		type: SHOW_MORE_UPLOADS,
		payload: {step, page, token, currShownUploads}
	};
};

export const setPrevUploads = (payload) => {
	return {
		type: SET_PREV_UPLOADS,
		payload
	};
};

export const setCurrSelectedUpload = (id, token, currShownUploads) => {
	return {
		type: SET_CURR_SELECTED_UPLOAD,
		payload: {id, token, currShownUploads}
	};
};

export const updateCurrSelUpload = (payload) => {
	return {
		type: UPDATE_CURR_SELECTED_UPLOAD,
		payload
	};
};

export const setCurrPage = (page) => {
	return {
		type: SET_CURR_PAGE,
		payload: {page}
	};
};

export const setUploadsApiStatus = (status) => {
	return {
		type: SET_UPLOADS_API_STATUS,
		payload: {status}
	};
};
