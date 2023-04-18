import {isNil} from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {Navigate, Outlet} from 'react-router-dom';
import {Loader} from '../../commons/components/Loader';
import {PAGE_LINKS} from '../../commons/constants';
import AppHeader from '../home/headar/AppHeader';

/***
 * Component for displaying file imports
 * @returns {JSX.Element}
 * @constructor
 *
 * @author mudit
 */

function Settings(props) {
	if (props.authenticatingSession) {
		return <Loader />;
	}
	if (isNil(props.email)) {
		return <Navigate to={'/' + PAGE_LINKS.LOGIN} />;
	}
	return (
		<div style={{height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'auto'}}>
			<AppHeader />
			<Outlet />
		</div>
	);
}

const mapStateToProps = ({auth}) => ({
	email: auth.userDetails.email,
	authenticatingSession: auth.userDetails.authenticatingSession
});

export default connect(mapStateToProps)(Settings);
