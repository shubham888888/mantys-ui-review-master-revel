import passwordValidator from 'password-validator';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Navigate, useSearchParams} from 'react-router-dom';
import {toast} from 'react-toastify';
import {Loader} from '../../../commons/components/Loader';
import {PAGE_LINKS} from '../../../commons/constants';
import {
	changeConfirmPass,
	changeResetPassword,
	resetPassword,
	toggleResetPasswordDone,
	validateResetPasswordLink
} from '../../../redux/actions/authActions';
import Logo from '../../../resources/logo/logo.png';
import {StyledHeading} from '../ForgotPassword/ForgotPasswordStyles';
import {Main, StyledButton, StyledDetails, StyledForm, StyledInput, Wrapper} from './ResetPasswordStyles';

const ResetPassword = (props) => {
	if (props.resetPasswordDone) {
		setTimeout(() => {
			props.toggleResetPasswordDone();
		}, 10);
		return <Navigate to={'/' + PAGE_LINKS.LOGIN} />;
	}
	const [searchParams, setSearchParams] = useSearchParams();
	const schema = new passwordValidator();
	schema.min(8);
	const email = searchParams.get('e');
	const primaryToken = searchParams.get('q1');
	const secondaryToken = searchParams.get('q2');

	useEffect(() => {
		props.checkValidity(email, primaryToken, secondaryToken);
	}, []);

	const resetPasswordFormSubmit = (e) => {
		e.preventDefault();
		if (props.confirmPass !== props.password) {
			return setError('Passwords do not match');
		}
		if (!schema.validate(props.password) || !schema.validate(props.confirmPass)) {
			return setError('Password should have a minimum length of 8 characters');
		}
		props.resetPassword(email, props.password, primaryToken, secondaryToken);
	};

	const [error, setError] = useState('');
	return (
		<>
			{props.validity === 'neutral' && <Loader />}
			{props.validity === 'invalid' && toast.error('The link has expired please try again', {toastId: 'id1'}) && (
				<div />
			)}
			{props.validity === 'valid' && (
				<Wrapper>
					<Main>
						<StyledDetails>
							<img src={Logo} alt="Not found" width="150" height="150" />
							<StyledHeading variant="h5" aling="center">
								Reset Password
							</StyledHeading>
						</StyledDetails>
						<StyledForm onSubmit={resetPasswordFormSubmit}>
							<StyledInput
								error={error !== ''}
								type="password"
								label="New Password"
								required
								value={props.password}
								onChange={(e) => {
									props.changePass(e.target.value);
									setError('');
								}}
							></StyledInput>
							<StyledInput
								error={error !== ''}
								type="password"
								label="Confirm Password"
								required
								value={props.confirmPass}
								helperText={error}
								onChange={(e) => {
									props.changeConfirmPass(e.target.value);
									setError('');
								}}
							></StyledInput>
							<StyledButton type="submit" variant="contained">
								Reset Password
							</StyledButton>
						</StyledForm>
					</Main>
				</Wrapper>
			)}
		</>
	);
};

export default connect(
	({auth}) => {
		return {
			password: auth.resetPassword,
			confirmPass: auth.confirmResetPass,
			validity: auth.resetLinkValidity,
			resetPasswordDone: auth.resetPasswordDone
		};
	},
	(dispatch) => {
		return {
			changePass: (password) => dispatch(changeResetPassword(password)),
			changeConfirmPass: (password) => dispatch(changeConfirmPass(password)),
			resetPassword: (email, password, primaryToken, secondaryToken) =>
				dispatch(resetPassword(email, password, primaryToken, secondaryToken)),
			checkValidity: (email, primaryToken, secondaryToken) =>
				dispatch(validateResetPasswordLink(email, primaryToken, secondaryToken)),
			toggleResetPasswordDone: () => dispatch(toggleResetPasswordDone())
		};
	}
)(ResetPassword);
