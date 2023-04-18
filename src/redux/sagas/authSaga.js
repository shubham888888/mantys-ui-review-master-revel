import {isEmpty} from 'lodash';
import log from 'loglevel';
import {toast} from 'react-toastify';
import {all, call, put, select, takeEvery, takeLatest} from 'redux-saga/effects';
import {
	CHECK_RESET_PASS_LINK,
	LOGIN_API,
	LOGOUT_API,
	REFRESH_SESSION_API,
	RESET_PASSWORD_API,
	SEND_EMAIL_API,
	USER_DETAILS_API
} from '../../commons/apiConstants';
import {REQUEST_STATUS} from '../../commons/constants';
import {get, getClientDetails, getHeaderConfigForToken, post} from '../../commons/utils/connectionUtils';
import {clearAuthCookie, getAuthDetailsFromCookie, setAuthCookie} from '../../commons/utils/cookieUtils';
import {
	AUTHENTICATE_SESSION,
	LOGIN,
	LOGOUT,
	REFRESH_SESSION,
	RESET_PASSWORD,
	SEND_PASSWORD_RESET_EMAIL,
	VALIDATE_PASSWORD_RESET_LINK
} from '../actions/actionConstants';
import {sendAnalytics} from '../actions/analyticsActions';
import {
	setAuthApiStatus,
	setForgotPasswordEmail,
	setLoginStatus,
	setUserDetails,
	setValidationInReducer,
	toggleForgotPasswordWindow,
	toggleResetPasswordDone
} from '../actions/authActions';
import {SENDING_EMAIL, SENDING_EMAIL_FAILED, SENDING_EMAIL_SUCCESS} from '../actions/common/apiStatusConstants';

/**
 * Function to check if the user details are available in the set cookie, else navigates user to the login page
 * @returns {Generator<*, void, *>}
 */
function* authenticateSession() {
	try {
		yield put(setUserDetails({authenticatingSession: true}));
		const authDetails = getAuthDetailsFromCookie();

		if (authDetails) {
			const {jwtToken} = authDetails;
			const response = yield call(get, USER_DETAILS_API, jwtToken);

			yield put(setUserDetails({...authDetails, ...response, authenticatingSession: false}));
		} else {
			yield put(setUserDetails({authenticatingSession: false}));
		}
	} catch (e) {
		log.error(e);
	}
}

/**
 * Function to check if the user details are available in the set cookie, else navigates user to the login page
 * @returns {Generator<*, void, *>}
 */
function* refreshSession() {
	try {
		const authDetails = getAuthDetailsFromCookie();

		if (authDetails) {
			const {refreshToken} = authDetails;
			const response = yield call(post, REFRESH_SESSION_API, {}, getHeaderConfigForToken(refreshToken));

			yield put(setUserDetails({...authDetails, ...response, authenticatingSession: false}));
			setAuthCookie(response);
		} else {
			yield put(setUserDetails({authenticatingSession: false}));
		}
	} catch (e) {
		log.error(e);
	}
}

function* login(action) {
	try {
		yield put(setUserDetails({authenticatingSession: true}));
		yield put(setLoginStatus(REQUEST_STATUS.LOADING));
		const data = yield call(post, LOGIN_API, action.payload);
		const clientDetails = yield call(getClientDetails);
		yield put(
			sendAnalytics({
				type: 'track_ip_address',
				ipAddress: clientDetails.ip,
				userId: data.userId,
				loginTime: new Date(),
				token: data.jwtToken
			})
		);

		yield all([
			put(setLoginStatus(REQUEST_STATUS.SUCCESS)),
			put(setUserDetails({...data, authenticatingSession: false, ipAddress: clientDetails.ip}))
		]);
		setAuthCookie(data);
		toast.success('Login successful');
	} catch (e) {
		log.error(e);
		yield put(setLoginStatus(REQUEST_STATUS.FAILED));
		toast.error('Login failed');
	}
}

function* logout(action) {
	try {
		const message = isEmpty(action.payload.message) ? 'Logout successful' : action.payload.message;
		const userDetails = yield select((state) => state.auth.userDetails);
		if (isEmpty(userDetails.email)) return;

		yield call(post, LOGOUT_API, {}, getHeaderConfigForToken(userDetails.jwtToken));
		clearAuthCookie();
		yield put(setUserDetails({}));
		yield put(setLoginStatus(null));
		toast.success(message);
	} catch (e) {
		log.error(e);
		toast.error('Logout failed');
	}
}

// sends password reset email
function* sendEmail(action) {
	try {
		yield put(setAuthApiStatus(SENDING_EMAIL));
		const {email} = action.payload;
		yield call(post, SEND_EMAIL_API, {email: email, password: ''});

		yield all([put(toggleForgotPasswordWindow()), put(setForgotPasswordEmail(null))]);
		toast.success('Email Sent Successfully');
		yield put(setAuthApiStatus(SENDING_EMAIL_SUCCESS));
	} catch (e) {
		toast.error(e?.response?.data?.message);
		yield put(setAuthApiStatus(SENDING_EMAIL_FAILED));
		log.error(e);
	}
}

function* validatePasswordResetLink(action) {
	try {
		const {email, primaryToken, secondaryToken} = action.payload;
		const body = {email, primaryToken, secondaryToken};
		const validationResponse = yield call(post, CHECK_RESET_PASS_LINK, body);
		const validation = validationResponse ? 'valid' : 'invalid';
		yield put(setValidationInReducer(validation));
	} catch (e) {
		log.error(e);
		yield put(setValidationInReducer('invalid'));
	}
}

function* resetPasswordOnServer(action) {
	const {email, password, primaryToken, secondaryToken} = action.payload;
	try {
		const body = {email, password, primaryToken, secondaryToken};

		const response = yield call(post, RESET_PASSWORD_API, body);
		toast.success('Password Reset Successfully');
		yield put(toggleResetPasswordDone());
	} catch (e) {
		log.error(e);
	}
}

export default function* authSaga() {
	yield all([
		yield takeLatest(LOGIN, login),
		yield takeLatest(LOGOUT, logout),
		yield takeEvery(AUTHENTICATE_SESSION, authenticateSession),
		yield takeLatest(REFRESH_SESSION, refreshSession),
		yield takeLatest(SEND_PASSWORD_RESET_EMAIL, sendEmail),
		yield takeLatest(RESET_PASSWORD, resetPasswordOnServer),
		yield takeLatest(VALIDATE_PASSWORD_RESET_LINK, validatePasswordResetLink)
	]);
}
