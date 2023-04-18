import * as ExcelJs from 'exceljs';
import {saveAs} from 'file-saver';
import _, {isEmpty, isNil, startCase, toLower, uniq} from 'lodash';
import {utils, writeFile} from 'xlsx';
import {inferColumnTypesFromData, renderCellOnConfig} from '../components/Grid/utils';
import {EXPORT_BOOK_DEFAULT_NAME} from '../constants';

const DEFAULT_SHEET_NAME = 'Mantys Worksheet';

/**
 * Util functions for grid
 */

/**
 * Parses data to create Headers in the react-table supported format
 * @param data
 * @returns {{header: *, key: *}[]|*[]}
 */
export const getHeadersFromData = (data, widthScaling) => {
	if (_.isEmpty(data)) {
		return [];
	}
	const keys = [];
	const widths = {};
	data.forEach((obj) => keys.push(...Object.keys(obj)));

	data.forEach((row) => {
		for (let key in row) {
			if (isNil(widths[key])) widths[key] = Math.max(key.toString().length, row[key].toString().length);
			else widths[key] = Math.max(widths[key], row[key].toString().length);
		}
	});
	return _.uniq(keys).map((key) => ({
		header: startCase(toLower(key)),
		key,
		width: widths[key] * widthScaling
	}));
};

/**
 * Converts given JSON data to an Excel and downloads it
 * @param data
 * @param headers
 * @param file
 * @param sheet
 */
export const exportToExcel = async (data, fileName, sheetName) => {
	const workbook = new ExcelJs.Workbook();
	const worksheet = workbook.addWorksheet(isNil(sheetName) ? DEFAULT_SHEET_NAME : sheetName);
	worksheet.columns = getHeadersFromData(data, 1.5);

	data.forEach((row) => {
		worksheet.addRow(row);
	});
	worksheet.getRow(1).eachCell((cell) => {
		cell.font = {bold: true};
	});
	const buf = await workbook.xlsx.writeBuffer();
	saveAs(new Blob([buf]), isNil(fileName) ? EXPORT_BOOK_DEFAULT_NAME : fileName + '.xlsx');
};

/**
 * Converts given table ref to an Excel and downloads it
 * @param table
 * @param file
 */
export const exportTableToExcel = (table, file = null) => {
	const workbook = utils.table_to_book(table.current);
	const fileName = _.isEmpty(file) ? EXPORT_BOOK_DEFAULT_NAME : file;
	writeFile(workbook, fileName, {compression: true});
};

/**
 * Util to order data based on column config
 * @param data
 * @param columns
 * @returns {*}
 */
export const orderDataColumns = (data, columns) => {
	if (isEmpty(columns) || isEmpty(data)) {
		return data;
	}
	const sortedColumns = columns.sort((a, b) => {
		return a.order > b.order;
	});
	let nestedSortedOrder = [];
	return data.map((d) => {
		const orderedData = {};
		sortedColumns.forEach((c) => {
			if (Object.keys(d).includes(c.name)) {
				orderedData[c.name] = d[c.name];
				if (c.nested) {
					nestedSortedOrder = c.columnOrdering.sort((a, b) => {
						return a.order > b.order;
					});
					const orderingNested = {};
					nestedSortedOrder.forEach((n) => {
						if (!isNil(orderedData[c.name][n.name])) {
							orderingNested[n.name] = orderedData[c.name][n.name];
						}
					});
					orderingNested.id = orderedData[c.name].id;
					orderedData[c.name] = orderingNested;
				}
			}
		});
		return orderedData;
	});
};

export const getColumnsForGroupedHeader = (data, columnConfigs, groupedColumns) => {
	let result = [];
	let orderCounter = 1;
	const _typeColumn = columnConfigs.find((columnConfig) => columnConfig.field === '_type');

	result.push(_typeColumn);

	const keys = [];
	data.forEach((obj) => keys.push(...Object.keys(obj)));
	const columnTypes = inferColumnTypesFromData(
		data,
		uniq(keys).filter((key) => key !== 'id')
	);

	groupedColumns.forEach((groupName) => {
		Object.entries(data[0][groupName]).forEach(([key, value]) => {
			if (key !== 'id') {
				result.push({
					field: groupName + orderCounter++,
					description: 'Type',
					type: columnTypes[toLower(key)],
					renderCell: (params) => renderCellOnConfig(params),
					editable: false,
					headerName: key,
					width: 250,
					align: 'left',
					headerAlign: 'left'
				});
			}
		});
	});

	return result;
};

export const getGroupingForGroupedHeader = (columns, groupedColumns) => {
	let result = [];
	let setSize = (columns.length - 1) / groupedColumns.length;

	let index = 1;
	groupedColumns.forEach((groupName, groupIndex) => {
		const groupHeaderName = groupName[0].toUpperCase() + groupName.slice(1);
		let currentGroup = {
			groupId: groupName,
			headerAlign: 'center',
			headerClassName: 'pl-header-class',
			headerName: groupHeaderName
		};
		currentGroup.children = [];
		for (; index < (groupIndex + 1) * setSize + 1; index++) {
			currentGroup.children.push({field: columns[index].field});
		}
		result.push(currentGroup);
	});

	return result;
};

export const getDataForGroupedHeader = (data, groupedColumns) => {
	let orderCounter = 1;
	return data.map((eachRecord) => {
		let orderCounterInternal = orderCounter;
		let currentRow = {
			__bold: eachRecord.__bold === true ? true : false,
			__row_highlight: eachRecord.__row_highlight === true ? true : false,
			_type: eachRecord._type,
			__celldata: eachRecord.__celldata,
			id: eachRecord.id
		};

		orderCounterInternal = 1;
		groupedColumns.forEach((groupName) => {
			if (!isEmpty(eachRecord[groupName])) {
				Object.entries(eachRecord[groupName]).forEach(([key, value]) => {
					if (key !== 'id') {
						currentRow[groupName + orderCounterInternal++] = value;
					}
				});
			}
		});
		return currentRow;
	});
};

export const getNavigationLinkByCellDataProperties = (cellData) => {
	let queryParamArray = [];

	Object.entries(cellData)
		.filter(([key, value]) => key !== 'url')
		.forEach(([key, value]) => {
			const paramValue = !isEmpty(value) ? value.replace(/ /g, '%20') : '';
			queryParamArray.push(key + '=' + paramValue);
		});
	const queryParams = queryParamArray.join('&');
	const reportLink = cellData.url + '?' + queryParams;
	return reportLink;
};
