import {Grow} from '@mui/material';
import _, {isEmpty, isNil} from 'lodash';
import log from 'loglevel';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {setValidationError} from '../../../redux/actions/fileImportActions';
import {getRowClickData} from '../../../redux/actions/reportsActions';
import {PAGE_LINKS} from '../../constants';
import {
	getColumnsForGroupedHeader,
	getDataForGroupedHeader,
	getGroupingForGroupedHeader,
	getNavigationLinkByCellDataProperties
} from '../../utils/GridUtils';
import UiFilters from '../Dashboard/Filter/UiFilters';
import FileViewer from '../pdfViewer/FileViewer';
import {DataGridStyled, GridLayoutWrapper, StyledFilters, StyledHeader} from './DataGridStyles';
import EditableGridFields from './EditableGridFields';
import ExpandableGrid from './ExpandableGrid';
import GridHeaderItems from './GridHeaderItems';
import MantysPagination from './MantysPagination';
import {getHeadersFromData} from './utils';

const MantysDataGrid = ({
	data,
	columnGrouping,
	groupedColumns,
	colorGroupOnDifference,
	clickGroupCells,
	gridWidth,
	fileName,
	excelAllowed,
	infoText,
	connectedReportId,
	filters,
	updateFilterValue,
	applyFilters,
	setPointInTimeStatus,
	pointInTimeStatus,
	dashboardGrid,
	template,
	getFileData,
	showEditableFields,
	expandable = false,
	fileData
}) => {
	const navigate = useNavigate();
	const [fileOpen, setFileOpen] = useState(false);
	const columns = getHeadersFromData(data, gridWidth, template);

	let gridData, gridColumns, gridColumnGroupingData;

	if (!columnGrouping) {
		gridData = data;
		gridColumns = columns;
		gridColumnGroupingData = null;
	} else {
		// grouping of columns
		gridData = getDataForGroupedHeader(data, groupedColumns);
		gridColumns = getColumnsForGroupedHeader(data, columns, groupedColumns);
		gridColumnGroupingData = getGroupingForGroupedHeader(gridColumns, groupedColumns);
	}

	return (
		<>
			{fileOpen && (
				<FileViewer
					base64Data={fileData.base64Data}
					contentType={fileData.contentType}
					setFileOpen={setFileOpen}
				/>
			)}
			<Grow in={true} style={{transformOrigin: '0 0 0'}}>
				<GridLayoutWrapper>
					{(fileName || excelAllowed) && (
						<StyledHeader>
							<GridHeaderItems
								fileName={fileName}
								infoText={infoText}
								connectedReportId={connectedReportId}
								excelAllowed={excelAllowed}
								data={data}
							/>
							{!_.isEmpty(filters) && (
								<StyledFilters>
									<span>
										{!dashboardGrid && (
											<UiFilters
												filters={filters}
												updateFilterValue={(filters, id, updatedValue) =>
													updateFilterValue(filters, id, updatedValue)
												}
												applyFilters={(filters) => applyFilters(filters)}
												setPointInTimeToggle={setPointInTimeStatus}
												pointInTimeStatus={pointInTimeStatus}
											/>
										)}
									</span>
								</StyledFilters>
							)}
							{showEditableFields && <EditableGridFields />}
						</StyledHeader>
					)}
					{expandable ? (
						<ExpandableGrid data={gridData} columns={columns} />
					) : (
						<DataGridStyled
							onCellClick={(params) => {
								try {
									const cellDetailData = params.row.__celldata;
									// TODO: Which column should be clicked will come in cellDetailData
									if (
										!isEmpty(cellDetailData) &&
										clickGroupCells &&
										!isEmpty(params.colDef.groupPath) &&
										!isEmpty(cellDetailData[params.colDef.groupPath[0]]) &&
										!isEmpty(cellDetailData[params.colDef.groupPath[0]].url)
									) {
										// group cell click functionality
										const currentCellData = cellDetailData[params.colDef.groupPath[0]];
										const reportLink = getNavigationLinkByCellDataProperties(currentCellData);
										return navigate(reportLink);
									} else if (
										!isEmpty(cellDetailData) &&
										['Sales person', '_type'].includes(params.field)
									) {
										if (!isEmpty(cellDetailData.fk)) {
											const fkValue = !cellDetailData.fk
												? ''
												: cellDetailData.fk.replace(/ /g, '%').toLowerCase();
											const classParamValue = !cellDetailData.class_param
												? ''
												: cellDetailData.class_param.replace(/ /g, '%').toLowerCase();
											const entityValue =
												cellDetailData.entity === undefined ? 'Both' : cellDetailData.entity;
											const reportLink =
												'/' +
												PAGE_LINKS.REPORTS +
												'/2' +
												`?entity=${entityValue}&fk=${fkValue}&class_param=${classParamValue}&startDate=${cellDetailData.startDate}&endDate=${cellDetailData.endDate}`;
											return navigate(reportLink);
										} else if (!isEmpty(cellDetailData.url)) {
											const reportLink = getNavigationLinkByCellDataProperties(cellDetailData);
											return navigate(reportLink);
										}
									}
								} catch (error) {
									log.error(error);
								}
							}}
							onRowClick={(params) => {
								const transactionType = params.row['Transaction Type'];
								if (!isNil(transactionType)) {
									const entitySelection = params.row.__realm_id;
									if (transactionType === 'Invoice') {
										getFileData('invoices', +params.row['__type_id'], entitySelection);
									} else {
										getFileData(
											transactionType.toLowerCase(),
											+params.row['__type_id'],
											entitySelection
										);
									}
									setFileOpen(true);
								}
							}}
							isCellEditable={(params) => true}
							experimentalFeatures={{newEditingApi: true, columnGrouping: true}}
							disableSelectionOnClick
							rows={gridData}
							columns={gridColumns}
							columnGroupingModel={gridColumnGroupingData}
							pageSize={100}
							variant="none"
							components={{
								Pagination: MantysPagination
							}}
							getCellClassName={(params) => {
								let classesOnCell = [];
								if (params.row.__bold) {
									classesOnCell.push('mantys-data-grid-cell-bold');
								}
								if (params.field === gridColumns[0].field) {
									classesOnCell.push('mantys-data-grid-first-column');
								}
								if (
									!isNaN(params.value) &&
									!isEmpty(colorGroupOnDifference) &&
									!isEmpty(params.colDef.groupPath) &&
									colorGroupOnDifference.includes(params.colDef.groupPath[0])
								) {
									let cellValue = +params.value;
									if (params.row._type === 'Total Income') {
										if (cellValue < 0) {
											classesOnCell.push('mantys-data-grid-cell-green');
										} else if (cellValue === 0) {
											classesOnCell.push('mantys-data-grid-cell-yellow');
										} else {
											classesOnCell.push('mantys-data-grid-cell-red');
										}
									} else {
										if (cellValue > 0) {
											classesOnCell.push('mantys-data-grid-cell-green');
										} else if (cellValue === 0) {
											classesOnCell.push('mantys-data-grid-cell-yellow');
										} else {
											classesOnCell.push('mantys-data-grid-cell-red');
										}
									}
								}

								return classesOnCell.join(' ');
							}}
							rowsPerPageOptions={[100]}
						/>
					)}
				</GridLayoutWrapper>
			</Grow>
		</>
	);
};

export default connect(
	({reportsState}, ownProps) => {
		return {fileData: reportsState.rowClickData, ...ownProps};
	},
	(dispatch) => {
		return {
			setUploadValidationError: (value) => dispatch(setValidationError(value)),
			getFileData: (transactionType, id, entity) => dispatch(getRowClickData(transactionType, id, entity))
		};
	}
)(MantysDataGrid);
