import {
	AUTHENTICATE_SESSION,
	CHANGE_CONFIRM_RESET_PASSWORD,
	CHANGE_RESET_PASSWORD,
	LOGIN,
	LOGOUT,
	REFRESH_SESSION,
	RESET_PASSWORD,
	SEND_PASSWORD_RESET_EMAIL,
	SET_AUTH_API_STATUS,
	SET_FORGOT_PASSWORD_EMAIL,
	SET_LOGIN_STATUS,
	SET_USER_DETAILS,
	SET_VALIDITY,
	TOGGLE_FORGOT_PASSWORD_WINDOW,
	TOGGLE_RESET_PASSWORD_DONE,
	VALIDATE_PASSWORD_RESET_LINK
} from './actionConstants';

export const authenticateSession = () => {
	return {
		type: AUTHENTICATE_SESSION
	};
};

export const login = (payload) => {
	return {
		type: LOGIN,
		payload
	};
};

export const logout = (message) => {
	return {
		type: LOGOUT,
		payload: {
			message
		}
	};
};

export const refreshSession = (payload) => {
	return {
		type: REFRESH_SESSION,
		payload
	};
};

export const setLoginStatus = (loginStatus) => {
	return {
		type: SET_LOGIN_STATUS,
		payload: {
			loginStatus: loginStatus
		}
	};
};

export const setAuthApiStatus = (status) => {
	return {
		type: SET_AUTH_API_STATUS,
		payload: {status}
	};
};

export const setUserDetails = (payload) => {
	return {
		type: SET_USER_DETAILS,
		payload
	};
};

export const toggleForgotPasswordWindow = () => {
	return {
		type: TOGGLE_FORGOT_PASSWORD_WINDOW
	};
};

export const setForgotPasswordEmail = (email) => {
	return {
		type: SET_FORGOT_PASSWORD_EMAIL,
		payload: email
	};
};

export const sendPasswordResetEmail = (email) => {
	return {
		type: SEND_PASSWORD_RESET_EMAIL,
		payload: {email}
	};
};

export const changeResetPassword = (password) => {
	return {
		type: CHANGE_RESET_PASSWORD,
		payload: password
	};
};

export const changeConfirmPass = (confirmPass) => {
	return {
		type: CHANGE_CONFIRM_RESET_PASSWORD,
		payload: confirmPass
	};
};

export const validateResetPasswordLink = (email, primaryToken, secondaryToken) => {
	return {
		type: VALIDATE_PASSWORD_RESET_LINK,
		payload: {email, primaryToken, secondaryToken}
	};
};

export const setValidationInReducer = (validity) => {
	return {
		type: SET_VALIDITY,
		payload: {validity}
	};
};

export const resetPassword = (email, password, primaryToken, secondaryToken) => {
	return {
		type: RESET_PASSWORD,
		payload: {email, password, primaryToken, secondaryToken}
	};
};

export const toggleResetPasswordDone = () => {
	return {
		type: TOGGLE_RESET_PASSWORD_DONE
	};
};
