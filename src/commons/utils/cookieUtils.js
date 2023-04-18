import crypto from 'crypto-js';
import {isNil} from 'lodash';
import Cookies from 'universal-cookie';

const AUTH_TOKEN_KEY = 'mnts-usr-mnts';
const SEPARATOR = 'mnts|&&|mnts';
const ENC_DEC_KEY = '|&mantys&|';

/**
 * Functions to encrypt and decrypt a string
 * @author haider
 */
const encrypt = (text) => {
	return crypto.AES.encrypt(text, ENC_DEC_KEY).toString();
};

const decrypt = (encryptedText) => {
	const bytes = crypto.AES.decrypt(encryptedText, ENC_DEC_KEY);
	return bytes.toString(crypto.enc.Utf8);
};

export function setAuthCookie(data) {
	const {expiryTime} = data;
	const expiryDate = new Date(expiryTime);

	const expiryTimeSeconds = expiryDate.getTime() / 1000;
	const currDate = new Date(Date.now());
	const timeNowSeconds = currDate.getTime() / 1000;
	const maxAge = expiryTimeSeconds - timeNowSeconds;

	const cookies = new Cookies();
	const cookieConfig = {secure: true, sameSite: 'Strict', maxAge};
	const cookieVal = `${data.jwtToken}${SEPARATOR}${data.refreshToken}`;

	const encryptedCookie = encrypt(cookieVal);
	cookies.set(AUTH_TOKEN_KEY, encryptedCookie, cookieConfig);
}

export function getAuthDetailsFromCookie() {
	const cookies = new Cookies();
	const encAuthCookie = cookies.get(AUTH_TOKEN_KEY);
	if (isNil(encAuthCookie)) {
		return null;
	}
	const authCookie = decrypt(encAuthCookie);
	const authDetails = authCookie.split(SEPARATOR);
	return {
		jwtToken: authDetails[0],
		refreshToken: authDetails[1]
	};
}

export function clearAuthCookie() {
	const cookies = new Cookies();
	cookies.remove(AUTH_TOKEN_KEY, {path: '/'});
}
