/* eslint-disable react/display-name */
import AddBox from '@mui/icons-material/AddBox';
import ArrowUpward from '@mui/icons-material/ArrowUpward';
import Check from '@mui/icons-material/Check';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';
import Clear from '@mui/icons-material/Clear';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import Edit from '@mui/icons-material/Edit';
import FilterList from '@mui/icons-material/FilterList';
import FirstPage from '@mui/icons-material/FirstPage';
import LastPage from '@mui/icons-material/LastPage';
import Remove from '@mui/icons-material/Remove';
import SaveAlt from '@mui/icons-material/SaveAlt';
import Search from '@mui/icons-material/Search';
import ViewColumn from '@mui/icons-material/ViewColumn';
import {startsWith} from 'lodash';
import MaterialTable from 'material-table';
import React, {forwardRef} from 'react';
import {COLORS} from '../../styles/theme';
import {nFormatter} from '../../utils/commonUtils';

const tableIcons = {
	Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
	ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};

function ExpandableGrid(props) {
	const columns = props.columns.map((column) => {
		return {
			...column,
			title: startsWith(column.field, '_') ? '' : column.description,
			headerStyle: {fontWeight: 'bold'}
		};
	});
	const data = props.data.map((d) => {
		const x = {...d};
		Object.entries(d).map(([key, val]) => {
			if (!isNaN(val) && !startsWith(key, '_') && key !== 'id') {
				x[key] = nFormatter(val, 2);
			}
		});
		x.parentId = x.__parentid > 0 ? x.__parentid : null;
		return x;
	});
	const rowStyle = (params) => {
		return {
			fontWeight: params.__bold ? 'bold' : null,
			backgroundColor: params.__row_highlight ? `${COLORS.PRIMARY_LIGHT}` : null
		};
	};
	const options = {
		toolbar: false,
		pageSize: 10,
		headerStyle: {
			position: 'sticky',
			top: '0'
		},
		maxBodyHeight: '500px',
		rowStyle
	};
	return (
		<MaterialTable
			data={data}
			columns={columns}
			options={options}
			icons={tableIcons}
			parentChildData={(row, rows) => rows.find((a) => a.id === row.parentId)}
		/>
	);
}

export default ExpandableGrid;
