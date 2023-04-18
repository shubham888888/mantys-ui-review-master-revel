import SaveIcon from '@mui/icons-material/Save';
import {LoadingButton} from '@mui/lab';
import {Button, Modal, TextField, Typography} from '@mui/material';
import * as validator from 'email-validator';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
	sendPasswordResetEmail,
	setForgotPasswordEmail,
	toggleForgotPasswordWindow
} from '../../../redux/actions/authActions';
import {SENDING_EMAIL} from '../../../redux/actions/common/apiStatusConstants';
import {Header, ModalBody, StyledBox, StyledCloseIcon, StyledForm, StyledHeading} from './ForgotPasswordStyles';

const ForgotPassword = (props) => {
	const [error, setError] = useState('');

	return (
		<Modal open={props.modalOpen}>
			<StyledBox>
				<ModalBody>
					<Header>
						<StyledHeading variant="h5">Forgot Password?</StyledHeading>
						<StyledCloseIcon
							onClick={() => {
								props.toggleModal();
								props.setEmail('');
							}}
						/>
					</Header>
					<Typography>No worries, we will send you reset instructions.</Typography>

					<StyledForm
						onSubmit={(e) => {
							e.preventDefault();
							if (!validator.validate(props.email)) {
								setError('Please enter a valid email');
								return;
							}

							// backend call to send email to a person
							props.sendEmail(props.email);
						}}
					>
						<TextField
							error={error !== ''}
							helperText={error}
							variant="outlined"
							label="E-mail"
							value={props.email}
							onChange={(e) => {
								setError('');
								props.setEmail(e.target.value);
							}}
						/>

						{props.authApiStatus === SENDING_EMAIL ? (
							<LoadingButton
								loading
								loadingPosition="start"
								startIcon={<SaveIcon />}
								variant="outlined"
								fullWidth
							>
								Sending Email
							</LoadingButton>
						) : (
							<Button type="submit" variant="contained">
								Reset Password
							</Button>
						)}
					</StyledForm>
				</ModalBody>
			</StyledBox>
		</Modal>
	);
};

export default connect(
	({auth}) => {
		return {
			modalOpen: auth.forgotPasswordModal,
			email: auth.forgotPasswordEmail,
			token: auth.userDetails.jwtToken,
			authApiStatus: auth.authApiStatus
		};
	},
	(dispatch) => {
		return {
			toggleModal: () => dispatch(toggleForgotPasswordWindow()),
			setEmail: (email) => dispatch(setForgotPasswordEmail(email)),
			sendEmail: (email) => dispatch(sendPasswordResetEmail(email))
		};
	}
)(ForgotPassword);
