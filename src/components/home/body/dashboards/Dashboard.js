import parse from 'html-react-parser';
import _, {isEmpty, isNil} from 'lodash';
import React, {useEffect, useState} from 'react';
import {Responsive, WidthProvider} from 'react-grid-layout';
import {connect} from 'react-redux';
import {Navigate, useParams} from 'react-router-dom';
import ChartsWrapper from '../../../../commons/components/Charts/ChartsWrapper';
import DashboardLink from '../../../../commons/components/Dashboard/DashboardLink/DashboardLink';
import UiFilters from '../../../../commons/components/Dashboard/Filter/UiFilters';
import EmptyData from '../../../../commons/components/Error/EmptyData';
import ErrorPage from '../../../../commons/components/Error/ErrorPage';
import {Loader} from '../../../../commons/components/Loader';
import {PAGE_LINKS} from '../../../../commons/constants';
import '../../../../commons/styles/reactGridLayout.css';
import {getQueryStringFilters} from '../../../../commons/utils/commonUtils';
import {API_FAILED, API_IN_PROGRESS} from '../../../../redux/actions/common/apiStatusConstants';
import {
	changeFilterValue,
	getDashboardData,
	setDashboardApiStatus,
	setPointInTimeStatus,
	updateDashboardLayout,
	viewPointInTimeData
} from '../../../../redux/actions/dashboardActions';
import {setCurrView} from '../../../../redux/actions/viewsActions';
import CustomGridItemComponent from '../cards/CardLayout';
import {DashboardWrapper, LightTooltip} from './DashboardStyles';

/**
 * Component for displaying the dashboard
 *
 * @author mudit
 */

const ResponsiveGridLayout = WidthProvider(Responsive);

function Dashboard(props) {
	if (props.authenticatingSession) {
		return <Loader />;
	}
	const [hoveringItemId, setHoveringItemId] = useState(-1);

	const {id} = useParams();
	useEffect(() => {
		props.getDashboardData(id, props.token);
		return () => {
			props.setApiStatus(null);
		};
	}, [id]);

	if (props.apiStatus === API_FAILED) return <ErrorPage />;

	const applyFilters = () => {
		props.getDashboardData(id, props.token, props.dashboardFilters, props.pointInTimeStatus);
	};

	if (props.apiStatus === API_IN_PROGRESS || isNil(props.apiStatus)) return <Loader />;

	if (!props.email) {
		return <Navigate to={'/' + PAGE_LINKS.LOGIN} />;
	}

	return (
		<>
			{!_.isEmpty(props.dashboardData) && (
				<DashboardWrapper>
					<UiFilters
						inlineMargin={'10px'}
						filters={props.dashboardFilters}
						updateFilterValue={props.updateFilterValue}
						applyFilters={applyFilters}
						viewPointInTimeData={props.viewPointInTimeData}
						setPointInTimeToggle={props.setPointInTimeToggle}
						raised="true"
						pointInTimeStatus={props.pointInTimeStatus}
					/>

					{isEmpty(props.dashboardData.data) ? (
						<EmptyData message={'No Data Found'} subHeading={'Try changing the filters'} />
					) : (
						<ResponsiveGridLayout
							layouts={{lg: props.dashboardData.layout}}
							breakpoints={{lg: 840, md: 768, sm: 614, xs: 380, xxs: 100}}
							cols={{lg: 10, md: 8, sm: 6, xs: 4, xxs: 2}}
							rowHeight={60}
							compactionType="horizontal"
							autoSize
							margin={[10, 10]}
							onLayoutChange={(layout) => {
								props.updateLayout(layout, id);
							}}
						>
							{props.dashboardData.data.map((dataItem) => {
								return (
									<div key={dataItem.i} data-grid={dataItem.layout.position}>
										<DashboardLink
											connectedReportId={
												dataItem.connectedReportId +
												getQueryStringFilters(props.dashboardFilters)
											}
										/>
										<LightTooltip
											placement="top-end"
											// open={openStatus[dataItem.id] ? openStatus[dataItem.id] : false}
											open={hoveringItemId === dataItem.id}
											title={parse(_.isNil(dataItem.hoverText) ? '' : dataItem.hoverText)}
										>
											<div
												style={{height: '100%'}}
												onMouseEnter={(e) => {
													if (!_.isEmpty(dataItem.hoverText)) {
														setHoveringItemId(dataItem.id);
													}
												}}
												onMouseLeave={(e) => {
													setHoveringItemId(-1);
												}}
											>
												<CustomGridItemComponent
													key={dataItem.id}
													label={dataItem.label}
													background={dataItem.background}
													type={dataItem.type}
													value={<ChartsWrapper dataItem={dataItem} maxGridCols={4} />}
												/>
											</div>
										</LightTooltip>
									</div>
								);
							})}
						</ResponsiveGridLayout>
					)}
				</DashboardWrapper>
			)}
		</>
	);
}

export default connect(
	({dashboardState, auth}) => {
		return {
			dashboardData: dashboardState.dashboardData,
			dashboardFilters: dashboardState.filters,
			token: auth.userDetails.jwtToken,
			email: auth.userDetails.email,
			authenticatingSession: auth.userDetails.authenticatingSession,
			layoutChanging: dashboardState.layoutChanging,
			apiStatus: dashboardState.apiStatus,
			pointInTimeStatus: dashboardState.pointInTimeStatus
		};
	},
	(dispatch) => {
		return {
			updateLayout: (layout, id) => dispatch(updateDashboardLayout(layout, id)),
			getDashboardData: (id, token, appliedFilters, pointInTimeStatus) =>
				dispatch(getDashboardData(id, token, appliedFilters, pointInTimeStatus)),
			updateFilterValue: (filters, id, updatedValue) => dispatch(changeFilterValue(filters, id, updatedValue)),
			viewPointInTimeData: (filters) => dispatch(viewPointInTimeData(filters)),
			setPointInTimeToggle: (status) => dispatch(setPointInTimeStatus(status)),
			setCurrView: (data) => dispatch(setCurrView(data)),
			setApiStatus: (status) => dispatch(setDashboardApiStatus(status))
		};
	}
)(Dashboard);
