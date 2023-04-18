import {isEmpty} from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {Loader} from '../../../../commons/components/Loader';
import {PAGE_LINKS} from '../../../../commons/constants';

/**
 * Component to display a placeholder on the home screen if the user has not configured any  views
 * @returns {JSX.Element}
 * @constructor
 *
 * @author Haider
 */

function HomePlaceholder(props) {
	if (!isEmpty(props.viewsData)) {
		const firstDashboardId = props.viewsData.filter((view) => view.id === 'dashboard')[0]?.children[0].object_id;
		if (!firstDashboardId) {
			return <Loader />;
		}
		return <Navigate to={'/' + PAGE_LINKS.DASHBOARDS + '/' + firstDashboardId} />;
	}
	return <Loader />;
}

export default connect(({viewsState}) => {
	return {viewsData: viewsState.viewsDataList};
})(HomePlaceholder);
