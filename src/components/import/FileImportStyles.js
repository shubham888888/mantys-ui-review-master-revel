import {Button} from '@mui/material';
import styled from 'styled-components';
import {COLORS} from '../../commons/styles/theme';

/**
 * Styled components for {@see FileImport}
 *
 * @author mudit
 */

export const NoTemplatesWrapper = styled.div`
	display: flex;
	justify-content: center;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	justify-content: center;
	align-items: center;
	min-height: 70vh;
`;

export const ButtonContainer = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: center;
	gap: 10px;
`;

// Wrapper Container for whole preview
export const PreviewWrapper = styled.div`
	height: 79.2vh;
	padding: 1vmin;
`;

// container to store upload and discard buttons on preview page
export const StyledFileDetails = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1vmin 2vmin;
`;

// File name container
export const StyledFileNameContainer = styled.span`
	font-size: 18px !important;
	font-weight: bold;
`;

export const StyledButton = styled(Button)`
	font-weight: bold !important;
	margin-right: 1vmin !important;
	font-size: 15px !important;
	color: ${COLORS.WHITE} !important;
	padding: 1vmin 2vmin !important;
	background-color: ${(props) => props.bg_color} !important;
`;

export const StyledUploadButton = styled(StyledButton)`
	background-color: ${COLORS.PRIMARY} !important;
`;
export const StyledDiscardButton = styled(StyledButton)`
	background-color: ${COLORS.RED} !important;
`;

// Wrapper for the preview of the data
export const StyledPreview = styled.div`
	height: 100%;
	width: 100%;
	overflow: scroll;
`;

// Container which containes template selection input and version input
export const TemplateContainer = styled.div`
	display: flex;
	gap: 20px;
	flex-wrap: wrap;
	justify-content: center;
	width: 90%;
	max-width: 700px;
`;

export const StyledAnchor = styled.a`
	text-decoration: none;
`;
