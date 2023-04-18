import axios from 'axios';
import {isNil} from 'lodash';

const axiosInstance = axios.create({
	// eslint-disable-next-line no-undef
	baseURL: process.env.REACT_APP_SERVICE_BASE_URL
});

axiosInstance.interceptors.response.use(
	(response) => response.data,
	(error) => {
		return Promise.reject(error);
	}
);

export function getHeaderConfigForToken(token) {
	return {
		headers: {
			token: token
		}
	};
}

export async function getClientDetails() {
	// eslint-disable-next-line no-undef
	const response = await axios.get(`https://ipapi.co/json`);
	return response.data;
}

// Auth Requests
export function post(url, payload, config) {
	return axiosInstance.post(url, payload, config);
}

export function get(url, token) {
	if (!isNil(token)) {
		const config = getHeaderConfigForToken(token);
		return axiosInstance.get(url, config);
	}
	return axiosInstance.get(url);
}
