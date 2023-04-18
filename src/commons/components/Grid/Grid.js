import {Button} from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import _ from 'lodash';
import T from 'prop-types';
import * as React from 'react';
import {useRef} from 'react';
import {useTable} from 'react-table';
import {exportToExcel} from '../../utils/GridUtils';

/**
 * Component for rendering a grid. Uses:
 * Material UI table {@link  https://mui.com/material-ui/react-table/#basic-table}
 * React-table {@link https://react-table-v7.tanstack.com/docs/quick-start}
 *
 * @author mudit
 */

export default function Grid(props) {
	const tableRef = useRef(null);

	const data = React.useMemo(() => props.data, [props.data]);

	const columns = React.useMemo(() => props.headers, [props.headers]);

	// const {columns, headers} = props;
	const tableInstance = useTable({columns, data});

	const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance;

	return (
		<>
			{props.exportAllowed ? (
				<div style={{display: 'flex', minWidth: '100%', justifyContent: 'flex-end', padding: '15px'}}>
					<Button
						variant="contained"
						size="small"
						onClick={() => {
							// exportTableToExcel(tableRef);
							exportToExcel(
								data,
								columns.map((col) => col.Header)
							);
						}}
					>
						Export to Excel
					</Button>
				</div>
			) : null}
			<TableContainer component={Paper} sx={{borderShadow: 'none !important'}}>
				<Table ref={tableRef} sx={{minWidth: 500}} stickyHeader {...getTableProps()}>
					<TableHead>
						{headerGroups.map((headerGroup) => (
							<TableRow key={_.uniqueId('headerRow')} {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<TableCell
										key={_.uniqueId('header')}
										style={{
											color: 'black',
											fontWeight: 'bold'
										}}
										{...column.getHeaderProps()}
									>
										{column.render('Header')}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableHead>
					<TableBody {...getTableBodyProps()}>
						{rows.map((row) => {
							prepareRow(row);
							return (
								<TableRow
									key={_.uniqueId('row')}
									sx={{
										'&:last-child tr, &:last-child th, &:last-child td': {
											border: 'none !important'
										}
									}}
									{...row.getRowProps()}
								>
									{row.cells.map((cell) => {
										return (
											<TableCell key={_.uniqueId('cell')} {...cell.getCellProps()}>
												{cell.render('Cell')}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}

Grid.propTypes = {
	data: T.array,
	headers: T.array,
	exportAllowed: T.bool
};
