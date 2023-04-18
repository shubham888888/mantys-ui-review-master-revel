import {Box} from '@mui/system';
import styled from 'styled-components';

export const StyledBox = styled(Box)`
	position: fixed;
	height: 100vh;
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const ModalBody = styled.div`
	background-color: white;
	padding: 2.4vmin 3vmin;
	max-width: 240px;
	border-radius: 6px;
`;

export const ActionButtons = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	gap: 10px;
	margin-top: 15px;
`;
