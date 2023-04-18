import {
	CHANGE_CONFIRM_RESET_PASSWORD,
	CHANGE_RESET_PASSWORD,
	SET_AUTH_API_STATUS,
	SET_FORGOT_PASSWORD_EMAIL,
	SET_LOGIN_STATUS,
	SET_USER_DETAILS,
	SET_VALIDITY,
	TOGGLE_FORGOT_PASSWORD_WINDOW,
	TOGGLE_RESET_PASSWORD_DONE
} from '../actions/actionConstants';

const initialState = {
	loginStatus: null,
	userDetails: {
		authenticatingSession: false
	},
	forgotPasswordModal: false,
	forgotPasswordEmail: '',
	resetPassword: '',
	confirmResetPass: '',
	resetLinkValidity: 'neutral',
	resetPasswordDone: false,
	authApiStatus: null
};

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case SET_LOGIN_STATUS:
			return {...state, loginStatus: action.payload.loginStatus};
		case SET_USER_DETAILS:
			return {...state, userDetails: action.payload, authenticatingSession: false};
		case TOGGLE_FORGOT_PASSWORD_WINDOW:
			return {...state, forgotPasswordModal: !state.forgotPasswordModal};
		case SET_FORGOT_PASSWORD_EMAIL:
			return {...state, forgotPasswordEmail: action.payload};
		case CHANGE_RESET_PASSWORD:
			return {...state, resetPassword: action.payload};
		case CHANGE_CONFIRM_RESET_PASSWORD:
			return {...state, confirmResetPass: action.payload};
		case SET_VALIDITY:
			return {...state, resetLinkValidity: action.payload.validity};
		case TOGGLE_RESET_PASSWORD_DONE:
			return {...state, resetPasswordDone: !state.resetPasswordDone};
		case SET_AUTH_API_STATUS:
			return {...state, authApiStatus: action.payload.status};
		default:
			return {...state};
	}
}
