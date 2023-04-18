import {SEND_ANALYTICS} from './actionConstants';

export const sendAnalytics = (payload) => {
	return {
		type: SEND_ANALYTICS,
		payload
	};
};
