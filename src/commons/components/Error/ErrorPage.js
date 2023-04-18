import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import {Typography} from '@mui/material';
import {isEmpty} from 'lodash';
import React from 'react';
import styled from 'styled-components';
import {COLORS} from '../../styles/theme';

const ErrorIcon = styled(ErrorOutlineRoundedIcon)`
	fill: ${COLORS.DARK_GREY};
	height: 4.5rem;
	width: 4.5rem;
`;
const ErrorWrapper = styled.div`
	position: fixed;
	inset: 0;
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
	background-color: white;
	gap: 10px;
	& > * {
		font-size: 2rem;
	}
	color: ${COLORS.DARK_GREY};
`;

const ErrorPage = ({error}) => {
	return (
		<ErrorWrapper>
			<ErrorIcon />
			<Typography component="h2">
				{isEmpty(error?.msg) ? <span>Oops! something went wrong</span> : <span>{error?.msg}</span>}
			</Typography>
		</ErrorWrapper>
	);
};

export default ErrorPage;
