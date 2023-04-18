import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {Autocomplete, LinearProgress} from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import _, {isNil} from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {connect} from 'react-redux';
import {Navigate, useNavigate} from 'react-router-dom';
import ErrorPage from '../../commons/components/Error/ErrorPage';
import MantysDataGrid from '../../commons/components/Grid/MantysDataGrid';
import {Loader} from '../../commons/components/Loader';
import {PAGE_LINKS} from '../../commons/constants';
import {COLORS} from '../../commons/styles/theme';
import {API_FAILED, API_IN_PROGRESS, FETCHING_TEMPLATES} from '../../redux/actions/common/apiStatusConstants';
import {redirect} from '../../redux/actions/common/commonActions';
import {
	getData,
	getTemplateOptions,
	setFileData,
	setTemplate,
	setVersion,
	toggleModal,
	uploadFileData
} from '../../redux/actions/fileImportActions';
import {
	ButtonContainer,
	Container,
	PreviewWrapper,
	StyledAnchor,
	StyledButton,
	StyledFileDetails,
	StyledPreview,
	TemplateContainer
} from './FileImportStyles';
import ConfirmationModal from './Modal/ConfirmationModal';
import TemplateVersion from './Template/TemplateVersion';

/**
 * Component for displaying new upload option
 * @returns {JSX.Element}
 * @constructor
 *
 * @author mudit
 */

function NewImport(props) {
	const [gridWidth, setGridWidth] = useState(940);
	const ref = useRef(null);
	const navigate = useNavigate();

	if (!isNil(props.apiStatus) && props.apiStatus[FETCHING_TEMPLATES] === API_FAILED)
		return <ErrorPage error={'Oops, Something went wrong'} />;

	const fileInputListener = async (e, headerCount = 1, skipRows = 0) => {
		if (!_.isEmpty(e.target?.files)) {
			props.getFileData(e, headerCount, skipRows);
		}
	};

	useEffect(() => {
		setGridWidth(ref.current?.clientWidth);
		props.getTemplateOptions(props.token);

		return () => {
			props.setFileData(null);
			props.redirect(null);
			props.setTemplate(null);
		};
	}, []);

	if (!isNil(props.apiStatus) && props.apiStatus[FETCHING_TEMPLATES] === API_IN_PROGRESS) return <Loader />;

	if (!_.isEmpty(props.redirectUrl)) {
		return <Navigate to={props.redirectUrl} />;
	}

	if (_.isEmpty(props.templateOptions)) {
		return <ErrorPage error="Couldn't find any templates" />;
	}

	if (_.isEmpty(props.fileData)) {
		return (
			<>
				{props.loading ? <LinearProgress sx={{width: '100%'}} /> : null}
				<Container>
					<CloudUploadIcon color="primary" sx={{fontSize: 100}} />
					<TemplateContainer>
						<Autocomplete
							options={props.templateOptions}
							sx={{width: 300}}
							value={props.template}
							onChange={(event, template) => {
								props.setVersion(null);
								props.setTemplate(template);
							}}
							renderInput={(params) => <TextField {...params} label="File Type" />}
						/>
						{props.template && (
							<TemplateVersion freq={props.template?.frequency} buffer={props.template?.buffer} />
						)}
					</TemplateContainer>
					<ButtonContainer>
						<Button
							variant="contained"
							size="large"
							component="label"
							disabled={_.isNil(props.template) || _.isNil(props.version)}
						>
							Select File
							{/*TODO check on the headers value*/}
							<input
								hidden
								type="file"
								accept={props.allowedExtensions}
								onInput={(e) =>
									fileInputListener(e, props.template.schema.headers, props.template.schema.skipRows)
								}
							/>
						</Button>
						{/* TODO : fix the download file */}
						<StyledAnchor
							href={_.isNil(props.template) ? '' : props.template.schema.downloadPath}
							download={_.isNil(props.template) ? '' : props.template.label}
						>
							<Button variant="outlined" size="large" disabled={_.isNil(props.template)}>
								Get Template
								{/*TODO: update file URL for download*/}
							</Button>
						</StyledAnchor>
					</ButtonContainer>
					<Button size="large" onClick={() => navigate(PAGE_LINKS.IMPORT_STATUS + '/1')}>
						View Previous Uploads
					</Button>
				</Container>
			</>
		);
	}
	return (
		<PreviewWrapper>
			<ConfirmationModal />
			<StyledPreview ref={ref}>
				<MantysDataGrid data={props.fileData} template={props.template} gridWidth={gridWidth} />
			</StyledPreview>
			<StyledFileDetails>
				<div></div>
				<div>
					<StyledButton
						bg_color={COLORS.RED}
						onClick={() => {
							props.setFileData(null);
						}}
					>
						Discard
					</StyledButton>
					<StyledButton
						bg_color={COLORS.PRIMARY}
						disabled={props.validationError}
						onClick={() => {
							props.uploadFile(props.template, props.version, props.fileData, props.token);
						}}
					>
						Upload
					</StyledButton>
				</div>
			</StyledFileDetails>
		</PreviewWrapper>
	);
}

export default connect(
	({fileImportState, auth, commonState}) => {
		return {
			fileData: fileImportState.fileData,
			loading: fileImportState.loading,
			templateOptions: fileImportState.templateOptions,
			template: fileImportState.template,
			version: fileImportState.version,
			token: auth.userDetails.jwtToken,
			redirectUrl: commonState.redirectUrl,
			validationError: fileImportState.uploadValidationError,
			apiStatus: fileImportState.apiStatus,
			allowedExtensions: fileImportState.allowedExtensions
		};
	},
	(dispatch) => {
		return {
			getFileData: (e, headerCount) => dispatch(getData(e, headerCount)),
			setFileData: (payload) => dispatch(setFileData(payload)),
			getTemplateOptions: (token) => dispatch(getTemplateOptions(token)),
			setTemplate: (template) => dispatch(setTemplate(template)),
			setVersion: (version) => dispatch(setVersion(version)),
			toggleModal: () => dispatch(toggleModal()),
			uploadFile: (template, version, fileData, token) =>
				dispatch(uploadFileData(template, version, fileData, token)),
			redirect: (url) => dispatch(redirect(url))
		};
	}
)(NewImport);
