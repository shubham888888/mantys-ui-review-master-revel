import AssessmentIcon from '@mui/icons-material/Assessment';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InsightsIcon from '@mui/icons-material/Insights';
import {isEmpty} from 'lodash';
import log from 'loglevel';
import React from 'react';
import {all, call, put, takeLatest} from 'redux-saga/effects';
import {VIEWS_LIST_API} from '../../commons/apiConstants';
import {get} from '../../commons/utils/connectionUtils';
import {capitaliseFirstLetter} from '../../commons/utils/fileImportUtils';
import {GET_VIEWS_DATA} from '../actions/actionConstants';
import {setViewsData} from '../actions/viewsActions';

const viewTypeIcons = {
	model: <InsightsIcon />,
	report: <AssessmentIcon />,
	dashboard: <DashboardIcon />
};

function parseViewsDataList(viewsData) {
	// dataItem.type === dataItem.view_type ( from backend )
	const viewTypes = ['dashboard', 'report', 'model'];
	const navigationPanelData = [];
	viewTypes.forEach((viewType) => {
		const viewTitle = capitaliseFirstLetter(viewType) + 's';
		const currViewTypeObj = {title: viewTitle, children: [], id: viewType};
		currViewTypeObj.children = viewsData
			.filter((dataItem) => dataItem.view_type === viewType)
			.map((dataItem) => {
				return {
					...dataItem,
					type: dataItem.view_type,
					label: dataItem.view_name,
					id: dataItem.view_id,
					icon: viewTypeIcons[viewType],
					data: null,
					link: '/' + dataItem.view_type + `/${dataItem.object_id}`
				};
			});
		if (!isEmpty(currViewTypeObj.children)) navigationPanelData.push(currViewTypeObj);
	});
	return navigationPanelData;
}

function* getViewsData(action) {
	try {
		const {token} = action.payload;

		const response = yield call(get, VIEWS_LIST_API, token);
		const viewsDataList = parseViewsDataList(response);

		yield put(setViewsData(viewsDataList));
	} catch (error) {
		log.error(error);
	}
}

export default function* viewsSaga() {
	yield all([takeLatest(GET_VIEWS_DATA, getViewsData)]);
}
