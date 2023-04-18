import _ from 'lodash';
import moment from 'moment';
import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {useLocation, useParams} from 'react-router-dom';
import styled from 'styled-components';
import EmptyData from '../../../../commons/components/Error/EmptyData';
import ErrorPage from '../../../../commons/components/Error/ErrorPage';
import MantysDataGrid from '../../../../commons/components/Grid/MantysDataGrid';
import {Loader} from '../../../../commons/components/Loader';
import {orderDataColumns} from '../../../../commons/utils/GridUtils';
import {getFiltersFromSearchParams} from '../../../../commons/utils/viewsUtils';
import {sendAnalytics} from '../../../../redux/actions/analyticsActions';
import {API_FAILED, API_IN_PROGRESS, API_SUCCESS} from '../../../../redux/actions/common/apiStatusConstants';
import {
	getDataById,
	setReportsPointInTimeStatus,
	updateReportsFilterValue
} from '../../../../redux/actions/reportsActions';

/**
 * Views component
 *
 * @author mudit
 */

const StyledWrapper = styled.div`
	height: 100%;
	padding: 20px;
`;

function Reports(props) {
	if (props.apiStatus === API_FAILED) return <ErrorPage />;

	const {id} = useParams();
	const ref = useRef(null);
	const [gridWidth, setGridWidth] = useState(940);

	let startDateStr, endDateStr;
	if (!_.isEmpty(props.filters)) {
		props.filters.forEach((filter) => {
			if (filter?.filterName === 'Month' && filter?.value) {
				let startDate, endDate;
				startDate = moment(filter.value, 'MMM YY');
				startDateStr = startDate.format('YYYY-MM-DD');
				endDate = startDate.add(1, 'month');
				endDateStr = endDate.format('YYYY-MM-DD');
			}
		});
	}

	const searchParams = useLocation().search;
	const queryParamFilters = getFiltersFromSearchParams(searchParams);

	useEffect(() => {
		setGridWidth(ref.current?.clientWidth);
	}, [ref.current?.clientWidth]);
	useEffect(() => {
		props.getReportsDataById(id, props.token, null, null, queryParamFilters);
		props.sendAnalytics({
			type: 'track_user_experience',
			viewId: id,
			filterConfig: props.filters,
			navigatedFrom: null
		});
	}, [id, searchParams]);

	if (props.apiStatus === API_IN_PROGRESS) return <Loader />;

	if (!(props.data?.length > 0)) {
		return <EmptyData message={'No Data Found'} />;
	}

	return (
		<StyledWrapper ref={ref} key={props.data.length}>
			{props.apiStatus === API_SUCCESS ? (
				<MantysDataGrid
					data={orderDataColumns(props.data, props.columns)}
					showEditableFields={true}
					infoText={props.hoverText}
					fileName={props.fileName}
					filters={props.filters}
					clickGroupCells={props.clickGroupCells}
					colorGroupOnDifference={props.colorGroupOnDifference}
					columnGrouping={props.columnGrouping}
					groupedColumns={props.groupedColumns}
					updateFilterValue={(filters, id, updatedValue) =>
						props.updateReportsFilterValue(filters, id, updatedValue)
					}
					applyFilters={(filters) => {
						props.getReportsDataById(id, props.token, filters, props.pointInTimeStatus);
						props.sendAnalytics({
							type: 'track_user_experience',
							viewId: id,
							filterConfig: props.filters,
							navigatedFrom: null
						});
					}}
					setPointInTimeStatus={(status) => props.setPointInTimeStatus(status)}
					pointInTimeStatus={props.pointInTimeStatus}
					connectedReportId={props.connectedReportId}
					excelAllowed={true}
					gridWidth={gridWidth}
				/>
			) : (
				<Loader />
			)}
		</StyledWrapper>
	);
}

export default connect(
	({reportsState, auth}) => {
		return {
			apiStatus: reportsState.reportsApiStatus,
			data: reportsState.data,
			fileName: reportsState.fileName,
			columns: reportsState.columns,
			token: auth.userDetails.jwtToken,
			hoverText: reportsState.hoverText,
			connectedReportId: reportsState.connectedReportId,
			clickGroupCells: reportsState.clickGroupCells,
			colorGroupOnDifference: reportsState.colorGroupOnDifference,
			columnGrouping: reportsState.columnGrouping,
			groupedColumns: reportsState.groupedColumns,
			filters: reportsState.filters,
			pointInTimeStatus: reportsState.pointInTimeStatus
		};
	},
	(dispatch) => {
		return {
			getReportsDataById: (id, token, filters, pointInTimeStatus, queryParamFilters) =>
				dispatch(getDataById(id, token, filters, pointInTimeStatus, queryParamFilters)),
			updateReportsFilterValue: (filters, id, updatedValue) =>
				dispatch(updateReportsFilterValue(filters, id, updatedValue)),
			setPointInTimeStatus: (status) => dispatch(setReportsPointInTimeStatus(status)),
			sendAnalytics: (payload) => dispatch(sendAnalytics(payload))
		};
	}
)(Reports);
