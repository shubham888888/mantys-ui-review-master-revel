import {isNil} from 'lodash';
import moment from 'moment';
import React from 'react';
import {connect} from 'react-redux';
import {Navigate} from 'react-router-dom';
import styled from 'styled-components';
import {Loader} from '../../commons/components/Loader';
import {PAGE_LINKS} from '../../commons/constants';
import {COLORS} from '../../commons/styles/theme';
import HomeNavigationDrawer from './body/navigationDrawer/HomeNavigationDrawer';
import AppHeader from './headar/AppHeader';

/**
 * Functional component to render the Home page
 * @returns {JSX.Element}
 * @constructor
 *
 * @author mudit
 */

const HomeWrapper = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	background-color: ${COLORS.WHITESMOKE_LIGHT};
	overflow: auto;
`;

function Home(props) {
	if (props.authenticatingSession) {
		return <Loader />;
	}
	if (isNil(props.email)) {
		return <Navigate to={'/' + PAGE_LINKS.LOGIN} />;
	}

	return (
		<HomeWrapper>
			<AppHeader />
			<HomeNavigationDrawer />
		</HomeWrapper>
	);
}

const mapStateToProps = ({auth}) => ({
	email: auth.userDetails.email,
	expiryTime: moment(auth.userDetails.expiryTime),
	authenticatingSession: auth.userDetails.authenticatingSession
});

export default connect(mapStateToProps)(Home);
