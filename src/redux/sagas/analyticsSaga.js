import {log} from 'loglevel';
import {all, call, select, takeEvery} from 'redux-saga/effects';
import {getHeaderConfigForToken, post} from '../../commons/utils/connectionUtils';
import {SEND_ANALYTICS} from '../actions/actionConstants';

function* sendAnalyticsToServer(action) {
	try {
		switch (action.payload.type) {
			case 'track_ip_address': {
				const {ipAddress, userId, loginTime, token} = action.payload;
				const url = '/track/userIp';
				yield call(post, url, {userId, ipAddr: ipAddress, loginTime}, getHeaderConfigForToken(token));
				break;
			}
			case 'track_user_experience': {
				const {viewId, filterConfig, navigatedFrom} = action.payload;
				let filters = {};
				if (filterConfig !== null) {
					filterConfig.forEach((filter) => {
						filters[filter.filterName] = filter.value;
					});
				}

				const url = '/track/user/experience';
				const {userId, jwtToken} = yield select((state) => state.auth.userDetails);
				yield call(
					post,
					url,
					{userId, viewId, navigatedFrom, filterConfig: JSON.stringify(filters)},
					getHeaderConfigForToken(jwtToken)
				);
				break;
			}
			default:
				break;
		}
		yield;
		// TODO : SEND ANALYTICS TO SERVER
	} catch (e) {
		log.error(e);
	}
}

export default function* analyticsSaga() {
	yield all([yield takeEvery(SEND_ANALYTICS, sendAnalyticsToServer)]);
}
