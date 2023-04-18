/* eslint-disable no-case-declarations */
import {camelCase, findIndex, isEmpty, isNil, startCase, uniq} from 'lodash';
import log from 'loglevel';
import moment from 'moment';
import queryString from 'query-string';
import {PAGE_LINKS} from '../constants';
import {CHART_COLOR, COLORS, DOUGHNUT_COLOR, RANDOM_COLORS} from '../styles/theme';
import {capitaliseFirstLetter} from './fileImportUtils';

/**
 *
 * @param {number} start
 * @param {number} end
 * @returns range between start and end (including both)
 */
export function getRange(start, end) {
	const ans = [];
	for (let i = start; i <= end; i++) {
		ans.push({id: i, value: i});
	}
	return ans;
}

function getComponentConfig(dataItem, value) {
	return {
		id: dataItem.component_id,
		i: dataItem.component_id,
		type: dataItem.component_type,
		label: dataItem.component_name,
		// TODO handle for graphs, grids and charts
		value,
		...dataItem.component_config,
		layout: {
			position: dataItem.position
		}
	};
}

// Data conversion for plotly
export function getComponentsLayoutFromData(data) {
	try {
		return data.map((dataItem) => {
			switch (dataItem.component_type) {
				case 'box':
					return getComponentConfig(dataItem, dataItem.component_data[0]);
				case 'grid':
					return getComponentConfig(dataItem, dataItem.component_data);
				case 'graph': {
					const labels = dataItem.component_data.map((cd) => cd.month);
					const graphKeys = Object.keys(dataItem.component_data[0]).filter(
						(k) => k !== 'month' && k !== 'id'
					);

					const graphData = [];
					graphKeys.forEach((key) => {
						const dataObj = {name: key, x: labels};
						dataObj.type = 'bar';
						dataObj.y = dataItem.component_data.map((obj) => obj[key]);
						graphData.push(dataObj);
					});
					return getComponentConfig(dataItem, graphData);
				}
				case 'line-chart': {
					const labels = uniq(dataItem.component_data.map((cd) => cd.month));
					const labelsMap = {};
					labels.forEach((label) => {
						labelsMap[label] = [];
					});

					let len = 0;
					dataItem.component_data.forEach((rowItem) => {
						labelsMap[rowItem.month].push(rowItem.value);
						len = Math.max(labelsMap[rowItem.month].length, len);
					});

					const lineData = [];
					for (let i = 0; i < len; i++) {
						const dataObj = {x: [], y: [], type: 'scatter'};
						for (let key in labelsMap) {
							dataObj.x.push(key);
							dataObj.y.push(labelsMap[key][i]);
						}
						lineData.push(dataObj);
					}
					return getComponentConfig(dataItem, lineData);
				}
				case 'doughnut': {
					const doughnutKeys = [];
					let values = [];
					dataItem.component_data.forEach((v) => {
						doughnutKeys.push(v.type);
						values.push(v.count);
					});

					const value = {
						labels: doughnutKeys,
						values,
						type: 'pie'
					};
					return getComponentConfig(dataItem, value);
				}
				case 'funnel': {
					const value = {x: [], y: [], type: 'funnel'};
					dataItem.component_data.forEach((row) => {
						value.x.push(row.value);
						value.y.push(row.x);
					});
					return getComponentConfig(dataItem, [value]);
				}
				default:
					return getComponentConfig(dataItem, null);
			}
		});
	} catch (e) {
		log.error(e);
	}
}

export function getLayoutFromData(data) {
	if (isEmpty(data)) {
		return [];
	}
	try {
		return data.map((dataItem) => {
			let new_component_data = {};
			let new_component_config = {};
			switch (dataItem.component_type) {
				case 'box':
					new_component_data = dataItem.component_data[0];
					break;
				case 'expandable-grid':
				case 'grid':
					// TODO: Hritik change to make data into pivot for grid
					new_component_data = dataItem.component_data;
					if (dataItem?.component_config?.pivot && new_component_data.length > 0) {
						let new_column_configs = [];
						let currentColumnOrder = 1;
						let currentRowOrder = 1;

						// grid data
						let gridData = [];

						// replace column with another in grid
						if (!isEmpty(dataItem?.component_config?.replaceColumn)) {
							// replace from to to column names
							const columnKeyFrom = dataItem?.component_config?.replaceColumn.from;
							const columnKeyTo = dataItem?.component_config?.replaceColumn.to;
							// add all the columns except the ones which will be updated
							dataItem.component_config.columns
								.filter((column) => column.name !== columnKeyFrom && column.name !== columnKeyTo)
								.sort((firstColumn, secondColumn) => firstColumn.order - secondColumn.order)
								.forEach((column) => {
									new_column_configs.push({name: column.name, order: currentColumnOrder++});
								});
							// keys except the modifyable keys
							let keysInEachRow = new_column_configs
								.map((value) => value.name)
								.filter((value) => value !== 'id');
							// all months column config in new column configs
							const monthSet = new Set(dataItem.component_data.map((row) => row[columnKeyFrom]));
							Array.from(monthSet)
								.sort((firstMonth, secondMonth) => {
									if (firstMonth.includes(' - ') === true) {
										firstMonth = firstMonth.split(' - ')[0];
									}
									if (secondMonth.includes(' - ') === true) {
										secondMonth = secondMonth.split(' - ')[0];
									}
									return new Date(firstMonth) - new Date(secondMonth);
								})
								.forEach((month) => {
									new_column_configs.push({name: month, order: currentColumnOrder++});
								});

							// insert data based on the same
							const dataSetForSingleMonth = new Set();
							//filter data
							dataItem.component_data
								.filter((row) => row[columnKeyFrom] === [...monthSet][0])
								.forEach((row) => {
									let newRow = JSON.parse(JSON.stringify(row));
									// delete two keys from the row
									delete newRow[columnKeyFrom];
									delete newRow[columnKeyTo];
									delete newRow['id'];
									dataSetForSingleMonth.add(newRow);
								});
							gridData = Array.from(dataSetForSingleMonth);

							dataItem.component_data.forEach((row) => {
								const monthName = row[columnKeyFrom];
								const monthValue = row[columnKeyTo];
								const indexOfGridRow = gridData.findIndex((gridRow) => {
									for (const key of keysInEachRow) {
										if (row[key] !== gridRow[key]) {
											return false;
										}
									}
									return true;
								});
								gridData.at(indexOfGridRow)[monthName] = monthValue;
							});
							// setting ids for each row
							gridData.forEach((row) => (row.id = currentRowOrder++));
						} else {
							// type is being populated on each row
							new_column_configs.push({name: 'id', order: currentColumnOrder++});
							new_column_configs.push({name: '_type', order: currentColumnOrder++});
							dataItem.component_config.columns
								.filter((column) => column.name !== 'id' && column.name !== 'month')
								.sort((first, second) => first.order - second.order)
								.forEach((column) =>
									gridData.push({
										id: currentRowOrder++,
										_type: column.name.replace(/_/g, ' ').toUpperCase()
									})
								);
							// insert values into grid now
							new_component_data
								.sort((first, second) => {
									let firstMonth = first.month;
									let secondMonth = second.month;
									if (firstMonth.includes(' - ') === true) {
										firstMonth = firstMonth.split(' - ')[0];
									}
									if (secondMonth.includes(' - ') === true) {
										secondMonth = secondMonth.split(' - ')[0];
									}
									return new Date(firstMonth) - new Date(secondMonth);
								})
								.forEach((currentValue, index) => {
									// add each row to the grid with specific month
									gridData.forEach((gridRow) => {
										gridRow[currentValue.month] =
											currentValue[gridRow._type.replace(/ /g, '_').toLowerCase()];
									});
									// add month to column configs
									new_column_configs.push({name: currentValue.month, order: currentColumnOrder++});
								});
						}
						new_component_data = Object.values(gridData);
						new_component_config.columns = new_column_configs;
					}
					break;
				case 'graph':
					new_component_data = dataItem.component_data;

					if (isEmpty(new_component_data)) {
						break;
					}
					// sort the data based on the month
					if ('month' in new_component_data[0]) {
						new_component_data = new_component_data.sort((first, second) => {
							let firstMonth = first.month;
							let secondMonth = second.month;
							if (firstMonth.includes(' - ') === true) {
								firstMonth = firstMonth.split(' - ')[0];
							}
							if (secondMonth.includes(' - ') === true) {
								secondMonth = secondMonth.split(' - ')[0];
							}
							return new Date(firstMonth) - new Date(secondMonth);
						});
					}

					// Currently this only works for time frame graphs with month column
					if (dataItem?.component_config?.pivot) {
						const data_obj = {};
						new_component_data.forEach((v) => {
							const obj = {month: v.month};
							obj[v.label] = v.value;
							data_obj[v.month] = {...data_obj[v.month], ...obj};
						});
						new_component_data = Object.values(data_obj);
					}

					// eslint-disable-next-line no-case-declarations
					const labels = new_component_data.map((cd) => cd.month);
					// eslint-disable-next-line no-case-declarations
					const graphKeys = Object.keys(new_component_data[0]).filter((k) => k !== 'month');
					// eslint-disable-next-line no-case-declarations
					const graphData = [];
					for (let i = 0; i < graphKeys.length; i++) {
						const opacity = getOpacityForItem(i, graphKeys.length);
						const key = graphKeys[i];
						const objForKey = {
							label: getLabelFromKey(key),
							backgroundColor: CHART_COLOR + opacity
						};
						if (dataItem?.component_config?.graph_type === 'stacked') {
							objForKey.stack = '0';
						}
						objForKey.data = new_component_data.map((obj) => obj[key]);
						graphData.push(objForKey);
					}
					new_component_data = {
						labels: labels,
						datasets: graphData
					};
					break;
				case 'funnel':
					const backgroundColors = [];
					for (let i = 0; i < dataItem.component_data.length; i++) {
						const opacity = getOpacityForItem(i, dataItem.component_data.length);
						backgroundColors.push(CHART_COLOR + opacity);
					}
					dataItem.component_data = dataItem.component_data.map((item) => {
						return {...item, name: item.x, value: Math.round(item.value)};
					});
					const {component_config} = dataItem;
					dataItem.component_data = dataItem.component_data.sort((a, b) => {
						return (
							findIndex(
								component_config.order,
								(x) => {
									return a.name === x;
								},
								0
							) -
							findIndex(
								component_config.order,
								(x) => {
									return b.name === x;
								},
								0
							)
						);
					});
					new_component_data = {data: dataItem.component_data, colorPallete: backgroundColors};
					break;
				case 'waterfall': {
					new_component_data = [
						{
							type: 'waterfall',
							orientation: 'v',
							x: [],
							y: [],
							measure: [],
							text: [],
							hovertemplate: '$ %{y:.2f}',
							textposition: 'outside',
							texttemplate: ' '
						}
					];
					const data = dataItem?.component_data[0];
					const waterFallConfig = [];
					for (let key in data) {
						waterFallConfig.push({key, value: data[key]});
					}
					if (isEmpty(waterFallConfig)) break;
					// TODO remove this hard-coded EBITDA and get order from backend
					waterFallConfig.sort((a, b) => (a.key !== 'EBITDA' ? (a.value < b.value ? 1 : -1) : 1));

					for (let i = 0; i < waterFallConfig.length; i++) {
						const currBar = waterFallConfig[i];
						new_component_data[0].x.push(currBar.key);
						new_component_data[0].y.push(
							currBar.value * (i === 0 || i === waterFallConfig.length - 1 ? 1 : -1)
						);
						new_component_data[0].text.push(waterFallConfig[i].value.toString());
						new_component_data[0].connector = {
							line: {
								color: '#00000000'
							}
						};
						new_component_data[0].increasing = {
							marker: {
								color: COLORS.WATERFALL + 'AA'
							}
						};
						new_component_data[0].decreasing = {
							marker: {
								color: COLORS.WATERFALL + 'AA'
							}
						};
						new_component_data[0].totals = {
							marker: {
								color: CHART_COLOR + '55'
							}
						};
						if (i === 0 || i === waterFallConfig.length - 1) new_component_data[0].measure.push('absolute');
						else new_component_data[0].measure.push('relative');
					}
					break;
				}
				case 'area-chart':
				case 'line-graph':
				case 'line-chart':
					// Currently this only works for time frame graphs with month column
					new_component_data = dataItem.component_data;
					// eslint-disable-next-line no-case-declarations
					const lineLabels = [...new Set(new_component_data.map((cd) => cd.month))];
					// eslint-disable-next-line no-case-declarations
					const lineData = [],
						itemSet = new Set();
					new_component_data.forEach((item, i) => {
						if (itemSet.has(item.label)) {
							return;
						}
						const isAreaChart = dataItem.component_type === 'area-chart';
						let color = RANDOM_COLORS[i % RANDOM_COLORS.length];
						if (isAreaChart) {
							color = color + '77';
						}
						const borderWidth = isAreaChart ? 0 : 1;
						const obj = {
							label: item.label,
							borderColor: color,
							backgroundColor: color,
							pointBorderWidth: 1,
							pointRadius: 1,
							borderWidth
						};
						if (i === 0 && isAreaChart) {
							obj.fill = 'origin';
						}
						obj.data = [];
						lineLabels.forEach((label) => {
							const val = new_component_data.filter((v) => v.month === label && v.label === item.label)[0]
								?.value;
							if (!isNil(val)) obj.data.push(val);
						});
						itemSet.add(item.label);
						lineData.push(obj);
					});
					new_component_data = {
						labels: lineLabels,
						datasets: lineData
					};
					break;
				case 'doughnut':
					new_component_data = dataItem.component_data;
					// eslint-disable-next-line no-case-declarations
					const doughnutKeys = [];
					// eslint-disable-next-line no-case-declarations
					let values = [];
					const backgroundColor = [];
					new_component_data.forEach((v, i) => {
						doughnutKeys.push(v.type);
						values.push(v.count);
						backgroundColor.push(DOUGHNUT_COLOR + getOpacityForItem(i, new_component_data.length));
					});
					// eslint-disable-next-line no-case-declarations
					new_component_data = {
						labels: doughnutKeys,
						datasets: [
							{
								label: dataItem.component_name,
								data: values,
								backgroundColor
							}
						]
					};
			}
			return {
				id: dataItem.component_id,
				i: dataItem.component_id,
				type: dataItem.component_type === 'line-chart' ? 'area-chart' : dataItem.component_type,
				label: dataItem.component_name,
				// TODO handle for graphs, grids and charts
				value: new_component_data,
				...dataItem.component_config,
				...new_component_config,
				layout: {
					position: dataItem.position
				}
			};
		});
	} catch (e) {
		log.error(e);
	}
}

export function getLayout(data) {
	if (isEmpty(data)) {
		return [];
	}
	return data.map((dataItem) => {
		return {
			...dataItem.position,
			i: dataItem.id
		};
	});
}

export function getRequestBodyFromFilters(filters, pointInTimeStatus) {
	const startDate = moment().startOf('month');
	const endDate = moment().add(1, 'month').startOf('month');

	const filterValues = {};
	let body = {startDate: '20230101', endDate: '20230201', fk: null, class_param: null, entity: null};

	filters?.forEach((filterItem) => {
		// set null if filter value is All
		if (filterItem.value === 'All') {
			filterItem.value = null;
		}
		const filterName = filterItem.filterName.toString().toLowerCase();
		const value = isEmpty(filterItem.value) ? null : filterItem.value;
		filterValues[filterName] = value;
		if (filterName === 'month') {
			if (value) {
				const {startDate, endDate, asof} = filterItem.valueToStartEndDates[value];
				body = {...body, startDate, endDate};
				if (pointInTimeStatus) body = {...body, asof: endDate};
			}
		} else {
			body = {
				...body,
				[filterName]: value
			};
		}
	});
	return {
		filterValues,
		body
	};
}

export function getFiltersFromResponse(response, filterValues) {
	return response?.filters?.map((filterItem) => {
		let filter = {};
		for (let key in filterItem) {
			filter = {...filter, [camelCase(key)]: filterItem[key]};
		}

		let value = isNil(filter.defaultValue) ? '' : filter.defaultValue;
		value = isNil(filterValues[filter.filterName]) ? value : filterValues[filter.filterName];

		if (filter.filterName === 'month') {
			const valueToStartEndDates = {};
			filter.allowedValues.forEach((value) => {
				valueToStartEndDates[value.name] = value;
			});

			return {
				...filter,
				allowedValues: filter.allowedValues.map((value) => {
					return value.name;
				}),
				valueToStartEndDates,
				value,
				filterName: capitaliseFirstLetter(filter.filterName)
			};
		}

		return {
			...filter,
			value,
			filterName: capitaliseFirstLetter(filter.filterName)
		};
	});
}

export function getLabelFromKey(key) {
	if (isEmpty(key) || key === 'undefined') {
		return 'Other';
	}
	return startCase(key);
}

/**
 * Function to return the opacity of an item in an array using uniform opacity distribution
 * @param index
 * @param arrayLength
 * @returns {number}
 */
export function getOpacityForItem(index, arrayLength) {
	return Math.round((1 - index / arrayLength) * 254).toString(16);
}

export function getFiltersFromSearchParams(searchParams) {
	const parsedParams = queryString.parse(searchParams);
	return parsedParams;
}

export function getConnectedReportLink(connectedReportId) {
	return '/' + PAGE_LINKS.REPORTS + '/' + connectedReportId;
}

export function getFilterValueFromResponseAndQueryParams(filterValues, queryParamFilters, filters) {
	let filterValuesNew = {...filterValues};

	if (queryParamFilters !== undefined && queryParamFilters !== null && queryParamFilters.fk !== null) {
		// handle startDate & endDate specially
		if (queryParamFilters.startDate !== null && queryParamFilters.startDate !== undefined) {
			const dateInBritishFormat = queryParamFilters.startDate.split('-').join('').substring(0, 8);
			filterValuesNew.month = Object.values(
				filters.filter((filter) => filter.filterName === 'Month')[0].valueToStartEndDates
			).filter((value) => value.startDate === dateInBritishFormat)[0].name;
		}
		// remaining query params to be set
		Object.entries(queryParamFilters)
			.filter(([key, value]) => key !== 'startDate' && key !== 'endDate')
			.forEach(([key, value]) => {
				filterValuesNew[key] = value;
			});
	}

	return filterValuesNew;
}
