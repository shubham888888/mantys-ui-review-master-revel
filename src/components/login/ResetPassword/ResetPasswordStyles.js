import {Button, TextField} from '@mui/material';
import {Container} from '@mui/system';
import styled from 'styled-components';

export const Wrapper = styled.div`
	height: 100vh;
	width: 100vw;
`;

export const Main = styled(Container)`
	height: 100%;
	width: 100%;
	display: flex !important;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 40px;
`;

export const StyledDetails = styled(Container)`
	display: flex !important;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;
export const Icon = styled.div``;

export const StyledForm = styled.form`
	display: flex;
	gap: 15px;
	flex-direction: column;
	width: 90%;
	max-width: 300px;
`;

export const StyledInput = styled(TextField)``;
export const StyledButton = styled(Button)``;
