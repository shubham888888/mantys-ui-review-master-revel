import {camelCase, isEmpty, isNil} from 'lodash';
import moment from 'moment/moment';

export const capitaliseFirstLetter = (str) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getMaxLenOfKey = (data, key) => {
	let maxLen = 1;
	data.forEach((dataObj) => {
		if (!isNil(dataObj[key])) {
			let currString = dataObj[key].toString();
			maxLen = Math.max(currString.length, maxLen);
		}
	});
	return maxLen;
};

export function isValidUploadedData(data, template) {
	const columns = template?.schema?.columns;
	if (isEmpty(columns)) return true;

	const validationConfigColumns = {};
	template?.schema?.columns.forEach((columnItem) => {
		let newColumnItem = {};
		for (let key in columnItem) {
			newColumnItem = {...newColumnItem, [camelCase(key)]: columnItem[key]};
		}
		validationConfigColumns[newColumnItem.name] = newColumnItem;
	});

	for (let row of data) {
		for (let key in row) {
			const cellValue = row[key];
			const column = validationConfigColumns[key];
			if (isEmpty(column)) continue;

			if (!column.emptyCell && isEmpty(cellValue)) return false;

			if (isEmpty(cellValue))
				switch (column.type) {
					case 'integer': {
						const numericValue = parseInt(cellValue, 10);
						if (isNaN(numericValue)) return false;
						break;
					}
					case 'double': {
						const floatValue = parseFloat(cellValue);
						if (isNaN(floatValue)) return false;
						break;
					}
					case 'Date': {
						const date = moment(cellValue);
						if (!date.isValid()) {
							return false;
						}
						break;
					}
					default:
						break;
				}
		}
	}
	return true;
}

export const getFileNameByTemplateVersion = (template, version) => {
	return template.replace(' ', '_') + '__' + version.replace(' ', '_');
};

export const cleanUploadedData = (template, data) => {
	if (isEmpty(template.schema.columns)) return data;
	const columns = template.schema.columns;
	const types = {};
	const charCleanup = {};
	const format = {};
	columns.forEach((item) => {
		const key = item.name.toLowerCase().trim();
		const value = item.type.toLowerCase().trim();
		types[key] = value;
		if (item.charCleanup) {
			charCleanup[key] = [...item.charCleanup];
		}
		if (item.format) {
			format[key] = item.format;
		}
	});
	const cleanData = [];
	data.forEach((d) => {
		const item = {};
		Object.entries(d).forEach(([key, value]) => {
			value = value.toString();
			const x = key.toLowerCase().trim();
			if (charCleanup[x]) {
				charCleanup[x].forEach((k) => {
					value = value.replace(k, '');
				});
			}
			switch (types[x]) {
				case 'integer': {
					value = value.replace(/,/g, '');
					value = value.replace(' ', '');
					if (value.trim() === '-') {
						value = '';
					}
					item[key] = parseInt(value);
					break;
				}
				case 'double': {
					value = value.replace(/,/g, '');
					value = value.replace(' ', '');
					if (value.trim() === '-') {
						value = '';
					}
					item[key] = parseFloat(value);
					break;
				}
				case 'date': {
					let dateFormat = 'DD-MM-YYYY';
					if (format[x]) {
						dateFormat = format[x];
					}
					let d = moment(value, dateFormat);
					if (d.isValid() && !isEmpty(value)) {
						item[key] = d.format('YYYY-MM-DD HH:MM:SS.SSSSSS');
					} else {
						item[key] = null;
					}
					break;
				}
				default:
					item[key] = value;
			}
		});
		cleanData.push(item);
	});
	return cleanData;
};
