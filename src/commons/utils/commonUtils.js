import {isEmpty, isNil} from 'lodash';

/**
 * @param {filters} array
 * @returns {params string to redirect to report from dashboard}
 */
export function getQueryStringFilters(filters) {
	let queryString = '?';
	filters.forEach((filter) => {
		if (!isEmpty(filter.value)) {
			const filterName = filter.filterName.toString().toLowerCase();
			if (filterName === 'month') {
				const filterInfo = filter.valueToStartEndDates[filter.value];
				if (!isNil(filterInfo))
					queryString += 'startDate=' + filterInfo.startDate + '&endDate=' + filterInfo.endDate;
			} else queryString += filterName + '=' + filter.value;
			queryString += '&';
		}
	});
	queryString = queryString.slice(0, -1);
	return queryString;
}

export function nFormatter(num, digits) {
	const copyOfNum = Math.abs(num);
	const lookup = [
		{value: 1, symbol: ''},
		{value: 1e3, symbol: 'k'},
		{value: 1e6, symbol: 'Mn'},
		{value: 1e9, symbol: 'G'},
		{value: 1e12, symbol: 'T'},
		{value: 1e15, symbol: 'P'},
		{value: 1e18, symbol: 'E'}
	];
	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
	const item = lookup
		.slice()
		.reverse()
		.find(function (item) {
			return copyOfNum >= item.value;
		});
	return item ? (num / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0';
}
