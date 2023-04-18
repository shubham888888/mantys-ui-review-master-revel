import CloseIcon from '@mui/icons-material/Close';
import {Typography} from '@mui/material';
import {Box} from '@mui/system';
import styled from 'styled-components';

export const StyledHeading = styled(Typography)`
	font-weight: bolder !important;
	margin: 0 !important;
`;

export const StyledCloseIcon = styled(CloseIcon)`
	cursor: pointer;
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const StyledBox = styled(Box)`
	position: fixed;
	height: 100vh;
	width: 100vw;
	display: flex;
	align-items: center;
	justify-content: center;
`;
export const ModalBody = styled.div`
	position: relative;
	background-color: white;
	padding: 20px 30px 20px 30px;
	border-radius: 6px;
	display: flex;
	flex-direction: column;
	gap: 20px;
	width: 90% !important;
	max-width: 350px;
`;

export const StyledForm = styled.form`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;
