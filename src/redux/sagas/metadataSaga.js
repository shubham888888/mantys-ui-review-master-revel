import log from 'loglevel';
import moment from 'moment';
import {toast} from 'react-toastify';
import {all, call, put, select, takeLatest} from 'redux-saga/effects';
import {getCurrencyRates, SET_CURRENCY_RATES} from '../../commons/apiConstants';
import {get, getHeaderConfigForToken, post} from '../../commons/utils/connectionUtils';
import {GET_METADATA, UPDATE_CURRENCY_RATES} from '../actions/actionConstants';
import {setMetadata} from '../actions/metadataActions';

function* getMetadata(action) {
	const {baseCurrency, startDate, endDate} = action.payload;
	try {
		yield put(setMetadata({loading: true}));
		const token = yield select((state) => state.auth.userDetails.jwtToken);
		const response = yield call(get, getCurrencyRates(baseCurrency, startDate, endDate), token);
		yield put(setMetadata({loading: false, currencyRates: response}));
	} catch (e) {
		yield put(setMetadata({loading: false}));
		toast.error('Error occurred while fetching metadata.');
		log.error(e);
	}
}

function* updateCurrencyRates(action) {
	const {baseCurrency, rate, startDate, endDate} = action.payload;
	try {
		yield put(setMetadata({loading: true}));
		const token = yield select((state) => state.auth.userDetails.jwtToken);
		const body = {
			baseCurrency,
			rate,
			validFrom: moment(startDate, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DDTHH:mm:ss'),
			validTo: moment(endDate, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DDTHH:mm:ss')
		};
		yield call(post, SET_CURRENCY_RATES, body, getHeaderConfigForToken(token));
		yield put(setMetadata({loading: false}));
	} catch (e) {
		yield put(setMetadata({loading: false}));
		toast.error('Error occurred while fetching metadata.');
		log.error(e);
	}
}

export default function* metadataSaga() {
	yield all([
		yield takeLatest(GET_METADATA, getMetadata),
		yield takeLatest(UPDATE_CURRENCY_RATES, updateCurrencyRates)
	]);
}
