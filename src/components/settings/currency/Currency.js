import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import {isNil, startCase} from 'lodash';
import moment from 'moment';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {toast} from 'react-toastify';
import UiFilters from '../../../commons/components/Dashboard/Filter/UiFilters';
import MantysDataGrid from '../../../commons/components/Grid/MantysDataGrid';
import {Loader} from '../../../commons/components/Loader';
import {getMetadata, setMetadata, updateCurrencyRates} from '../../../redux/actions/metadataActions';
import EditCurrencyForm from './EditCurrencyForm';

const filters = [
	{
		filterId: '1',
		filterName: 'Base Currency',
		filterType: 'drop-down',
		allowedValues: ['INR']
	},
	{
		filterId: '0',
		filterName: 'To Currency',
		filterType: 'drop-down',
		allowedValues: ['USD'],
		value: 'USD',
		disabled: true
	},
	{
		filterId: '2',
		filterName: 'Start month',
		filterType: 'drop-down',
		allowedValues: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
	},
	{
		filterId: '3',
		filterName: 'Start year',
		filterType: 'number',
		min: 2016,
		max: 2024
	},
	{
		filterId: '4',
		filterName: 'End month',
		filterType: 'drop-down',
		allowedValues: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
	},
	{
		filterId: '5',
		filterName: 'End year',
		filterType: 'number',
		min: 2016,
		max: 2024
	}
];

const getValuesFromFilters = (filters) => {
	let startDate, endDate, baseCurrency;
	const mapF = {};
	filters.forEach((f) => {
		mapF[f.filterId] = f.value;
	});
	if (mapF['1']) {
		baseCurrency = mapF['1'];
	}
	if (mapF['2'] && mapF['3']) {
		const month = mapF['2'];
		const year = mapF['3'];
		startDate = moment().startOf('month').set({month, year}).format('YYYY-MM-DD HH:mm:SS');
	}
	if (mapF['4'] && mapF['5']) {
		const month = mapF['4'];
		const year = mapF['5'];
		endDate = moment().startOf('month').set({month, year}).format('YYYY-MM-DD HH:mm:SS');
	}
	return {baseCurrency, startDate, endDate};
};

const invalidFilters = (baseCurrency, startDate, endDate, rate) => {
	return (
		isNil(baseCurrency) ||
		isNil(startDate) ||
		isNil(endDate) ||
		!moment(endDate, 'YYYY-MM-DD HH:mm:SS').isAfter(moment(startDate, 'YYYY-MM-DD HH:mm:SS')) ||
		(!isNil(rate) && rate < 0)
	);
};

function Currency(props) {
	const updateFilterValue = (f, id, val) => {
		f.forEach((fil) => {
			if (fil.filterId === id) {
				fil.value = val.toString();
			}
		});
		props.setMetadata({filters: [...f]});
	};

	const applyFilters = (filters) => {
		const {baseCurrency, startDate, endDate} = getValuesFromFilters(filters);
		if (invalidFilters(baseCurrency, startDate, endDate)) {
			toast.error('Invalid inputs');
			return;
		}
		props.setMetadata({
			startDate,
			endDate,
			baseCurrency
		});
	};

	useEffect(() => {
		props.setMetadata({filters: filters});
	}, []);

	useEffect(() => {
		const payload = {
			startDate: props.startDate ? props.startDate : '2001-01-01 00:00:00',
			endDate: props.endDate ? props.endDate : '2100-01-01 00:00:00'
		};
		props.getMetadata(payload);
	}, [props.baseCurrency, props.startDate, props.endDate]);

	if (props.loading) {
		return <Loader />;
	}

	let months = new Set();
	const currencyRates = props.currencyRates.map((c, i) => {
		const currency = {};
		currency.id = i;
		Object.keys(c).forEach((k) => {
			const label = startCase(k);
			switch (k) {
				case 'rate':
					currency[label] = '$ ' + c[k].toFixed(4).toString();
					break;
				case 'toCurrency':
					break;
				case 'validTo':
				case 'validFrom':
					currency[label] = moment(c[k]).format('MMM YYYY');
					months.add(currency[label]);
					break;
				default:
					currency[label] = c[k];
			}
		});
		return currency;
	});

	months = [...months].sort((a, b) => {
		return moment(a, 'MMM YYYY').diff(moment(b, 'MMM YYYY'));
	});

	const toggleEditorVisibility = () => {
		props.setMetadata({editorVisible: !props.editorVisible});
	};

	const groupedRates = {};
	currencyRates.forEach((c) => {
		let obj = groupedRates[c['Base Currency']];
		if (isNil(obj)) {
			const monthData = {};
			months.forEach((m) => {
				monthData[m] = null;
			});
			groupedRates[c['Base Currency']] = {
				id: c.id,
				'Base Currency': c['Base Currency'],
				...monthData
			};
			obj = groupedRates[c['Base Currency']];
		}
		obj[c['Valid From']] = c['Rate'];
	});

	return (
		<div style={{height: '100vh', padding: '20px', display: 'flex', gap: '10px', flexDirection: 'column'}}>
			<div style={{display: 'flex', justifyContent: 'space-between'}}>
				<UiFilters
					raised={'true'}
					hidePointInTime
					filters={props.filters}
					applyFilters={applyFilters}
					updateFilterValue={updateFilterValue}
				/>
				<Button variant={'contained'} onClick={toggleEditorVisibility}>
					<EditIcon fontSize={'small'} sx={{marginRight: '7px'}}></EditIcon>
					Edit
				</Button>
				<EditCurrencyForm
					editorVisible={props.editorVisible}
					filters={[...filters]}
					onClose={toggleEditorVisibility}
					onUpdate={(formData) => {
						const {baseCurrency, startDate, endDate} = getValuesFromFilters(formData.filters);
						const {rate} = formData;
						const invalid = invalidFilters(baseCurrency, startDate, endDate, rate);
						if (invalid || isNil(rate)) {
							toast.error('Invalid input');
						} else {
							props.updateCurrencyRates(baseCurrency, rate, startDate, endDate);
							toggleEditorVisibility();
						}
					}}
				/>
			</div>
			<MantysDataGrid columns data={Object.values(groupedRates)} />
		</div>
	);
}

export default connect(
	({metadataState}) => {
		return {
			currencyRates: metadataState.currencyRates,
			loading: metadataState.loading,
			baseCurrency: metadataState.baseCurrency,
			startDate: metadataState.startDate,
			endDate: metadataState.endDate,
			filters: metadataState.filters,
			editorVisible: metadataState.editorVisible
		};
	},
	(dispatch) => {
		return {
			getMetadata: (payload) => dispatch(getMetadata(payload)),
			setMetadata: (payload) => dispatch(setMetadata(payload)),
			updateCurrencyRates: (baseCurrency, rate, startDate, endDate) =>
				dispatch(updateCurrencyRates(baseCurrency, rate, startDate, endDate))
		};
	}
)(Currency);
