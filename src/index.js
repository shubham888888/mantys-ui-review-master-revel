/* eslint-disable no-undef */
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import styled from 'styled-components';
import App from './App';
import {store} from './configureStore';
import './index.css';
import {authenticateSession} from './redux/actions/authActions';
import appReducer from './redux/reducers/appReducer';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

const UnsecuredPageWarning = styled.h1`
	color: red;
`;

const Link = styled.a`
	text-decoration: none;
	color: red;
`;

// Component to be rendered for frame busting
const UnsecuredPage = () => (
	<div>
		<UnsecuredPageWarning>
			If you see this page, Webb App link you have clicked on is under Clickjacking security attack.
		</UnsecuredPageWarning>
		<h2>Please inform the tech team about the reference of the application from where you clicked this link.</h2>
	</div>
);

// Preventing clickjacking attacks - ref: https://stackoverflow.com/questions/67937100/can-we-prevent-clickjacking-from-client-side-rendered-react-js-application
if (window.self === window.top) {
	root.render(
		<Provider store={store}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
		</Provider>
	);
} else {
	root.render(<UnsecuredPage />);
}

store.dispatch(authenticateSession());

// Enabling hot deploy for Redux module
if (process.env.NODE_ENV !== 'production' && module.hot) {
	module.hot.accept('redux', () => store.replaceReducer(appReducer));
}

reportWebVitals();
