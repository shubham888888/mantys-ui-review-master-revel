import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Navigate, useNavigate} from 'react-router-dom';
import {Copyright, HorizontalDivider} from '../../commons/components/commons';
import {PAGE_LINKS, REQUEST_STATUS} from '../../commons/constants';
import {COLORS} from '../../commons/styles/theme';
import {login, toggleForgotPasswordWindow} from '../../redux/actions/authActions';
import Login_BG from '../../resources/login/login_bg.png';
import Logo from '../../resources/logo/logo.png';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import {
	CopyrightContent,
	CopyrightWrapper,
	Image,
	ImageContainer,
	InputFields,
	Layout,
	LoginButton,
	LoginForm,
	LoginFormContainer,
	StyledAnchor,
	styledAnchor,
	StyledTextLink,
	Title,
	Wrapper
} from './LoginStyles';

/**
 * Component to render the login page
 * @author mudit
 */

/**
 * @returns {JSX.Element}
 * @constructor
 */
const NEW_ACCOUNT = {
	MAIL_RECIPIENT: 'support@mantys.io',
	MAIL_SUBJECT: 'New Mantys account'
};
function Login(props) {
	if (props.email && moment().diff(props.expiryTime, 'seconds') > 0) {
		return <Navigate to={PAGE_LINKS.HOME} />;
	}

	/**
	 * Mail recipient on requesting a new account
	 * @type {{MAIL_RECIPIENT: string, MAIL_SUBJECT: string}}
	 */

	const navigate = useNavigate();

	const [form, setForm] = useState({
		email: '',
		password: ''
	});

	/**
	 * Sign-In click handler
	 */
	const handleSubmit = (e) => {
		e.preventDefault();
		props.login(form);
	};

	if (props.email) {
		navigate(PAGE_LINKS.HOME, {replace: true});
	}

	const inputHandler = (e) => {
		setForm({...form, [e.target.name]: e.target.value});
	};

	return (
		<Wrapper>
			<ForgotPassword />
			<Layout>
				<LoginFormContainer>
					<LoginForm onSubmit={(e) => handleSubmit(e, props.login, form)} autoComplete="off">
						<div>
							<img src={Logo} alt="Not found" width="150" height="150" />
						</div>
						<Title variant="text">MANTYS</Title>
						<Typography variant="h5">Log In</Typography>
						<InputFields
							label="Email"
							name="email"
							value={form.email}
							onChange={inputHandler}
							autoComplete="off"
						/>
						<InputFields
							label="Password"
							name="password"
							value={form.password}
							onChange={inputHandler}
							type="password"
							autoComplete="off"
						/>
						{props.loginStatus === REQUEST_STATUS.LOADING ? (
							<LoadingButton
								loading
								loadingPosition="start"
								startIcon={<SaveIcon />}
								variant="outlined"
								fullWidth
							>
								Signing In
							</LoadingButton>
						) : (
							<LoginButton variant="contained" width="300px" type="submit">
								Sign In
							</LoginButton>
						)}
						<Typography variant="body1">
							Don&apos;t have an account?&nbsp;
							<StyledAnchor
								href={'mailto:' + NEW_ACCOUNT.MAIL_RECIPIENT + '?subject=' + NEW_ACCOUNT.MAIL_SUBJECT}
								target="_blank"
								rel="noreferrer"
							>
								Contact Us
							</StyledAnchor>
						</Typography>
						<StyledTextLink
							onClick={() => {
								props.toggleForgotPasswordModal();
							}}
						>
							Forgot Password?
						</StyledTextLink>
						<br />
						<Typography variant="body2">
							By signing in, you consent to&nbsp;
							<StyledAnchor href="https://www.mantys.io/privacy-policy" target="_blank" rel="noreferrer">
								privacy policy
							</StyledAnchor>
							&nbsp;and&nbsp;
							<StyledAnchor
								style={{color: COLORS.PRIMARY}}
								href="https://www.mantys.io/terms-of-use"
								target="_blank"
								rel="noreferrer"
							>
								terms of use.
							</StyledAnchor>
						</Typography>
					</LoginForm>
				</LoginFormContainer>
				<ImageContainer>
					<Image src={Login_BG} alt="Not found" />
				</ImageContainer>
			</Layout>
			<CopyrightWrapper>
				<HorizontalDivider />
				<CopyrightContent>
					<div></div>
					<Copyright>© 2023 Pearrity Private Limited. All rights reserved.</Copyright>
				</CopyrightContent>
			</CopyrightWrapper>
		</Wrapper>
	);
}

export default connect(
	({auth}) => {
		return {
			loginStatus: auth.loginStatus,
			email: auth.userDetails.email,
			expiryTime: moment(auth.userDetails.expiryTime)
		};
	},
	(dispatch) => {
		return {
			login: (payload) => dispatch(login(payload)),
			toggleForgotPasswordModal: () => dispatch(toggleForgotPasswordWindow())
		};
	}
)(Login);
