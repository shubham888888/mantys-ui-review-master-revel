import {
	GET_FILE_DATA,
	GET_TEMPLATE_OPTIONS,
	SET_FILE_DATA,
	SET_FILE_IMPORT_API_STATUS,
	SET_LOADING,
	SET_TEMPLATE,
	SET_TEMPLATE_OPTIONS,
	SET_TEMPLATE_VERSION,
	SET_VALIDATION_ERROR,
	TOGGLE_MODAL,
	UPLOAD_FILE,
	UPLOAD_FILE_FORCED
} from './actionConstants';

export const getData = (e, headerCount = 1, skipRows) => {
	return {
		type: GET_FILE_DATA,
		payload: {e, headerCount, skipRows}
	};
};

export const getTemplateOptions = (token) => {
	return {
		type: GET_TEMPLATE_OPTIONS,
		payload: {token}
	};
};

export const setTemplateOptions = (templateOptions) => {
	return {
		type: SET_TEMPLATE_OPTIONS,
		payload: {templateOptions}
	};
};

export const setFileData = (payload) => {
	return {
		type: SET_FILE_DATA,
		payload
	};
};

export const setLoading = (payload) => {
	return {
		type: SET_LOADING,
		payload
	};
};

export const setTemplate = (template) => {
	return {
		type: SET_TEMPLATE,
		payload: template
	};
};

export const setVersion = (version) => {
	return {
		type: SET_TEMPLATE_VERSION,
		payload: version
	};
};

export const setFileImportApiStatus = (apiName, status) => {
	return {
		type: SET_FILE_IMPORT_API_STATUS,
		payload: {apiName, status}
	};
};

export const uploadFileData = (template, version, fileData, token) => {
	return {
		type: UPLOAD_FILE,
		payload: {template, version, fileData, token}
	};
};

export const uploadFileDataForced = (template, version, fileData, token) => {
	return {
		type: UPLOAD_FILE_FORCED,
		payload: {template, version, fileData, token}
	};
};

export const toggleModal = () => {
	return {
		type: TOGGLE_MODAL
	};
};

export const setValidationError = (errorValue) => {
	return {
		type: SET_VALIDATION_ERROR,
		payload: {errorValue}
	};
};
