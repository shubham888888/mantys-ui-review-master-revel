/**
 * Utils to handle parsing and processing of Excel sheets using sheetjd
 */

import _ from 'lodash';
import {utils} from 'xlsx';

/**
 * Populating merged cell values in all cells
 * @param wb
 */
export const parseMergedCells = (wb) => {
	for (let worksheet of wb.SheetNames) {
		if (wb.Sheets[worksheet]['!merges']) {
			wb.Sheets[worksheet]['!merges'].map((merge) => {
				// Finding the cell which contains the merged value
				const value = utils.encode_range(merge).split(':')[0];
				// Populating all cells in the range with the same value
				for (let col = merge.s.c; col <= merge.e.c; col++)
					for (let row = merge.s.r; row <= merge.e.r; row++) {
						wb.Sheets[worksheet][utils.encode_col(col) + (row + 1)] = wb.Sheets[worksheet][value];
					}
			});
		}
	}
};

/**
 * Gets data from sheet array handling merged header columns by concatinating the nested headers
 * @param dataArray
 * @param headerCount
 * @returns {*[]}
 */
export const getDataFromSheetArray = (dataArray, headerCount) => {
	const headersList = [];
	const columns = dataArray[0].length;
	for (let i = 0; i < columns; i++) {
		let header = dataArray[0][i].toString().trim().replace('"', '').trim();
		for (let j = 1; j < headerCount; j++) {
			header = header + ' ' + dataArray[j][i].toString().trim().replace('"', '').trim();
		}
		headersList.push(header.trim());
	}
	const data = [];
	let id = 1;
	for (let i = headerCount; i < dataArray.length; i++) {
		data.push(getDataObj(id, headersList, dataArray[i]));
		id++;
	}
	return data;
};

/**
 * Creates data object for sheet row using the headers and a given value object
 * @param headers
 * @param val
 * @returns {{}}
 */
export const getDataObj = (id, headers, val) => {
	const obj = {id};
	for (let i in headers) {
		const header = headers[i].trim().replace('.', ' ');
		if (!_.isEmpty(header)) {
			obj[header] = val[i];
		}
	}
	return obj;
};
