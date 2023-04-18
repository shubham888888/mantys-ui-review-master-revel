import {
	SET_CURR_PAGE,
	SET_PREV_UPLOADS,
	SET_UPLOADS_API_STATUS,
	UPDATE_CURR_SELECTED_UPLOAD
} from '../actions/actionConstants';

const initialState = {
	prevUploads: [],
	currSelectedUpload: {data: []},
	currPage: 1,
	apiError: null,
	uploadsApiStatus: null
};

export default function importReducer(state = initialState, action) {
	switch (action.type) {
		case SET_CURR_PAGE:
			return {...state, currPage: action.payload.page};
		case SET_PREV_UPLOADS:
			return {...state, prevUploads: action.payload};
		case UPDATE_CURR_SELECTED_UPLOAD:
			return {...state, currSelectedUpload: action.payload};
		case SET_UPLOADS_API_STATUS:
			return {...state, uploadsApiStatus: action.payload.status};
		default:
			return state;
	}
}
