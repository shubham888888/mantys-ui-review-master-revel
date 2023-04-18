import {Button, Typography} from '@mui/material';
import Modal from '@mui/material/Modal';
import React from 'react';
import {connect} from 'react-redux';
import {toggleModal, uploadFileDataForced} from '../../../redux/actions/fileImportActions';
import {ActionButtons, ModalBody, StyledBox} from './ModalStyles';

const ConfirmationModal = (props) => {
	return (
		<Modal open={props.modalOpen}>
			<StyledBox>
				<ModalBody>
					<Typography>
						Do you really want to discard the previously uploaded file and upload this file ?
					</Typography>
					<ActionButtons>
						<Button
							variant="outlined"
							onClick={() => {
								props.toggleModal();
							}}
						>
							No
						</Button>
						<Button
							variant="contained"
							onClick={() => {
								const {template, version, fileData, token} = props;
								props.uploadFileForced(template, version, fileData, token);
							}}
						>
							Yes
						</Button>
					</ActionButtons>
				</ModalBody>
			</StyledBox>
		</Modal>
	);
};

export default connect(
	({fileImportState, auth}) => {
		return {
			modalOpen: fileImportState.modalOpen,
			fileData: fileImportState.fileData,
			template: fileImportState.template,
			version: fileImportState.version,
			token: auth.userDetails.jwtToken
		};
	},
	(dispatch) => {
		return {
			toggleModal: () => dispatch(toggleModal()),
			uploadFileForced: (template, version, fileData, token) =>
				dispatch(uploadFileDataForced(template, version, fileData, token))
		};
	}
)(ConfirmationModal);
