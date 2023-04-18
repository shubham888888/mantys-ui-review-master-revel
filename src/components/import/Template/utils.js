import moment from 'moment/moment';

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December'
];

export const getBufferedYears = (buffer) => {
	const d = new Date(Date.now());
	let year = d.getFullYear();
	const opts = [];
	while (buffer--) {
		opts.push(year.toString());
		year--;
	}
	return opts;
};

export const getBufferedMonths = (buffer) => {
	let now = moment();
	const opts = [];
	while (buffer--) {
		const currMonth = now.month();
		const currYear = now.year();
		now.subtract(1, 'months');
		opts.push(months[currMonth].substring(0, 3) + ' ' + currYear);
	}
	return opts;
};

export const getBufferedWeeks = (buffer) => {
	const now = moment();
	const opts = [];
	const currDay = now.weekday();
	now.subtract(currDay, 'days');
	while (buffer--) {
		const end = now.date() + ' ' + months[now.month()].substring(0, 3) + ' ' + now.year();
		now.subtract(6, 'days');
		const st = now.date() + ' ' + months[now.month()].substring(0, 3) + ' ' + now.year();
		now.subtract(1, 'days');
		opts.push(st + ' - ' + end);
	}
	return opts;
};

export const getBufferedDays = (buffer) => {
	const now = moment();

	const opts = [];
	while (buffer--) {
		const currDate = now.date();
		const currMonth = now.month();
		const currYear = now.year();

		opts.push(currDate + ' ' + months[currMonth].substring(0, 3) + ' ' + currYear);
		now.subtract(1, 'days');
	}
	return opts;
};
