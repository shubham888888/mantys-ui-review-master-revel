import '@fontsource/roboto';
import {ThemeProvider} from '@mui/material';
import {isEmpty} from 'lodash';
import React, {useEffect, useState} from 'react';
import {useIdleTimer} from 'react-idle-timer';
import {connect} from 'react-redux';
import {RouterProvider} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {router} from './AppRouter';
import {Theme} from './commons/styles/theme';
import {logout, refreshSession} from './redux/actions/authActions';
import {redirect} from './redux/actions/common/commonActions';

/**
 * Functional component for the application
 *
 * @author mudit
 */

function App(props) {
	const [userActive, setUserActive] = useState(false);

	/**
	 * Checks if the user was active in the last interval to refresh the session and reset the flag to inactive.
	 */
	const checkAndRefreshSession = (active, email, setActive) => {
		if (active && !isEmpty(email)) {
			props.refreshSession();
			setActive(false);
		}
	};

	useEffect(() => {
		const interval = setInterval(
			() => checkAndRefreshSession(userActive, props.email, setUserActive),
			2 * 60 * 1000
		);
		return () => {
			clearInterval(interval);
		};
	}, [props.email, userActive]);

	const handleOnIdle = (active, email, logout) => {
		if (!isEmpty(email) && !active) {
			logout('Logged out due to inactivity');
		}
	};

	/**
	 * Marking the user as active on action
	 */
	const handleOnAction = (event, active, email, setActive) => {
		if (!isEmpty(email) && !active) {
			setActive(true);
		}
	};

	useIdleTimer({
		timeout: 10 * 60 * 1000,
		onAction: (event) => handleOnAction(event, userActive, props.email, setUserActive),
		onIdle: () => handleOnIdle(userActive, props.email, props.logout),
		debounce: 500
	});

	return (
		<>
			<ThemeProvider theme={Theme}>
				<RouterProvider router={router} />
			</ThemeProvider>
			<ToastContainer
				position="top-center"
				autoClose={2000}
				closeOnClick
				pauseOnFocusLoss
				hideProgressBar
				pauseOnHover
			/>
		</>
	);
}

export default connect(
	({auth}) => {
		return {
			email: auth.userDetails.email,
			expiryTime: auth.userDetails.expiryTime
		};
	},
	(dispatch) => {
		return {
			logout: (message) => dispatch(logout(message)),
			refreshSession: () => dispatch(refreshSession()),
			redirect: (url) => dispatch(redirect(url))
		};
	}
)(App);
