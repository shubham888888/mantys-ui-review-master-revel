import {
	SET_FILE_DATA,
	SET_FILE_IMPORT_API_STATUS,
	SET_LOADING,
	SET_TEMPLATE,
	SET_TEMPLATE_OPTIONS,
	SET_TEMPLATE_VERSION,
	SET_VALIDATION_ERROR,
	TOGGLE_MODAL
} from '../actions/actionConstants';

const initialState = {
	fileData: [],
	loading: false,
	template: null,
	version: null,
	modalOpen: false,
	currSelectedFileCount: 0,
	templateOptions: [],
	uploadValidationError: false,
	apiStatus: null,
	allowedExtensions:
		'.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
};

export default function fileImportReducer(state = initialState, action) {
	switch (action.type) {
		case SET_FILE_DATA:
			return {...state, fileData: action.payload};
		case SET_LOADING:
			return {...state, loading: action.payload};
		case SET_TEMPLATE_OPTIONS:
			return {...state, templateOptions: [...action.payload.templateOptions]};
		case SET_TEMPLATE:
			return {...state, template: action.payload};
		case SET_TEMPLATE_VERSION:
			return {...state, version: action.payload};
		case TOGGLE_MODAL:
			return {...state, modalOpen: !state.modalOpen};
		case SET_VALIDATION_ERROR:
			return {...state, uploadValidationError: action.payload.errorValue};
		case SET_FILE_IMPORT_API_STATUS:
			return {...state, apiStatus: {...state.apiStatus, [action.payload.apiName]: action.payload.status}};
		default:
			return state;
	}
}
