import * as React from 'react';
import Grid from '../commons/components/Grid/Grid';

/**
 * https://mui.com/material-ui/react-table/#basic-table
 */

function createData(name, live, forecast, worstCase) {
	return {name, live, forecast, worstCase};
}

const rows = [
	createData('Total revenue', '$74,000', '$74,000', '$68,000'),
	createData('Total COGS', '$(15,082)', '$(14,616)', '$(13,549)'),
	createData('Gross Margin', '$58,918', '$59,384', '$54,451'),
	createData('Operating Expenses', '$(56,555)', '$(40,987)', '$(30,654)'),
	createData('EBITDA', '$3,564', '$1,432', '$2,435'),
	createData('Net Income', '$3,564', '$1,432', '$2,435')
];

const headers = [
	{
		Header: 'Name',
		accessor: 'name'
	},
	{
		Header: 'Live Forecast',
		accessor: 'live'
	},
	{
		Header: 'FY22 Q4 Forecast',
		accessor: 'forecast'
	},
	{
		Header: 'AOP Worst Case',
		accessor: 'worstCase'
	}
];

export default function BasicTable() {
	return <Grid data={rows} headers={headers} />;
}
