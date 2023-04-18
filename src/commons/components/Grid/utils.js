import {camelCase, isEmpty, startCase, toLower, uniq} from 'lodash';
import moment from 'moment';
import React from 'react';
import {nFormatter} from '../../utils/commonUtils';
import {getMaxLenOfKey} from '../../utils/fileImportUtils';
import {CellComponent} from './CellComponent';

const dateFormats = ['MM/DD/YYYY', 'MM/DD/YY', 'DD/MM/YY', 'DD/MM/YYYY', 'MM-DD-YYYY', 'DD-MM-YYYY', 'L', 'LL'];

function getGridCompatibleType(type) {
	switch (type) {
		case 'integer':
			return 'number';
		case 'double':
			return 'number';
		default:
			return type;
	}
}

export function inferColumnTypesFromData(data, headerNames) {
	const columnTypes = {};

	headerNames.forEach((header) => {
		let type = null;
		data.forEach((row) => {
			if (type !== 'string') {
				const floatValue = parseFloat(row[header]);
				if (!isNaN(floatValue) || isEmpty(row[header])) {
					type = 'number';
					return;
				}
				const date = moment(row[header], dateFormats);
				if (date.isValid()) {
					type = 'date';
					return;
				}
				type = 'string';
			}
		});
		columnTypes[header] = type;
	});
	return columnTypes;
}

export function renderCellOnConfig(params, column) {
	if (isEmpty(column)) {
		if (!isNaN(params.value))
			return (
				<CellComponent
					showError={false}
					error={nFormatter(params.value, 2)}
					cellValue={nFormatter(params.value, 2)}
				/>
			);

		return <CellComponent showError={false} error={params.value} cellValue={params.value} />;
	}

	const cellValue = params.value;
	if (!column.emptyCell && isEmpty(cellValue))
		return <CellComponent error="Cell can't be empty" cellValue={cellValue} />;

	if (isEmpty(cellValue)) return cellValue;

	switch (column.type) {
		case 'integer': {
			const numericValue = parseInt(cellValue, 10);
			if (isNaN(numericValue))
				return <CellComponent error="The value should be an integer" cellValue={cellValue} />;
			return numericValue;
		}
		case 'double': {
			const floatValue = parseFloat(cellValue);
			if (isNaN(floatValue))
				return <CellComponent error="The value should be an integer" cellValue={cellValue} />;
			return floatValue;
		}
		case 'Date': {
			const date = moment(cellValue, dateFormats);
			if (!date.isValid()) {
				return <CellComponent error="Please enter a valid date" cellValue={cellValue} />;
			}
			return cellValue;
		}
		default:
			return cellValue;
	}
}

export function getHeadersFromData(data, gridWidth = 940, template) {
	const validationConfigColumns = {};
	template?.schema?.columns?.forEach((columnItem) => {
		let newColumnItem = {};
		for (let key in columnItem) {
			newColumnItem = {...newColumnItem, [startCase(key)]: columnItem[key]};
		}
		validationConfigColumns[newColumnItem.name] = newColumnItem;
	});

	const MAX_COLUMN_WIDTH = 250;
	function getCharLen(key) {
		return 20;
	}
	if (isEmpty(data)) {
		return [];
	}
	const keys = [];
	data.forEach((obj) => keys.push(...Object.keys(obj)));
	let totalWidth = 0;
	const columnTypes = inferColumnTypesFromData(
		data,
		uniq(keys).filter((key) => key != 'id')
	);

	const headers = uniq(keys)
		.filter((key) => (key != 'id') & !key.startsWith('__'))
		.map((key) => {
			let maxLen = Math.max(getMaxLenOfKey(data, key), key.toString().length);
			let currWidth = Math.min(MAX_COLUMN_WIDTH, maxLen * getCharLen(key));
			totalWidth += currWidth;
			const header = startCase(key);
			const columnDataType = toLower(validationConfigColumns[header]?.type);
			return {
				field: key,
				description: header,
				type: isEmpty(columnDataType) ? columnTypes[key] : getGridCompatibleType(columnDataType),
				renderCell: (params) => renderCellOnConfig(params, validationConfigColumns[header]),
				editable: !isEmpty(template),
				headerName: key.startsWith('_') ? '' : header,
				width: currWidth,
				align: 'left',
				headerAlign: 'left'
			};
		});

	// TODO : Add a select component using below configuration
	// headers.push({
	// 	field: 'country',
	// 	headerName: 'Country',
	// 	width: 150,
	// 	editable: true,
	// 	type: 'singleSelect',
	// 	valueOptions: ['India', 'Japan', 'Australia']
	// });
	const extraWidth = Math.max(0, gridWidth - totalWidth) / headers.length;

	return headers.map((headerItem) => {
		return {...headerItem, width: Math.min(MAX_COLUMN_WIDTH, headerItem.width + extraWidth)};
	});
}
