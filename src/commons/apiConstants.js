/**
 * Constants for API URLs
 */
// Auth API constants
export const LOGIN_API = '/auth';
export const LOGOUT_API = '/user/logout';
export const SEND_EMAIL_API = '/auth/reset/mail';
export const RESET_PASSWORD_API = '/auth/reset';

export const REFRESH_SESSION_API = '/auth/refresh/jwt';
export const CHECK_RESET_PASS_LINK = '/auth/reset/check';
export const USER_DETAILS_API = '/user/getDetails';

// APIs for views
export const VIEWS_LIST_API = '/view/getList';

export const getUpdateAssumptionsApi = (objectId) => `/view/${objectId}/update/inputField`;

// APIs for previous uploads
export const getPrevUploadsApi = (offset = 0, limit = 5, dir = 'ASC', sortBy = 'id') =>
	`/files/imports?offset=${offset}&limit=${limit}&dir=${dir}&sortBy=${sortBy}`;
export const getPrevUploadByNameAPI = (name) => `/files/imports/${name}`;
export const getPrevUploadByIdAPI = (id) => `/files/imports/byId/${id}`;

// APIs for metadata
export const getCurrencyRates = (baseCurrency, validFrom, validTo) => {
	const url = `/metadata/getCurrencyRates?validFrom=${validFrom}&validTo=${validTo}`;
	return url + (baseCurrency ? `&baseCurrency=${baseCurrency}` : '');
};

export const SET_CURRENCY_RATES = '/metadata/setCurrencyRates';