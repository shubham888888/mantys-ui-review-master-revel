import {GET_METADATA, SET_METADATA, UPDATE_CURRENCY_RATES} from './actionConstants';

export const getMetadata = (payload) => {
	return {
		type: GET_METADATA,
		payload
	};
};

export const setMetadata = (data) => {
	return {
		type: SET_METADATA,
		payload: data
	};
};

export const updateCurrencyRates = (baseCurrency, rate, startDate, endDate) => {
	return {
		type: UPDATE_CURRENCY_RATES,
		payload: {baseCurrency, rate, startDate, endDate}
	};
};
