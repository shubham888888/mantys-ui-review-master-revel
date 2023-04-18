import {Typography} from '@mui/material';
import styled from 'styled-components';
import {COLORS} from '../../styles/theme';

export const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	padding: 30px 15px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const StyledLabel = styled(Typography)`
	font-size: 0.9rem !important;
	font-weight: 550 !important;
	color: ${COLORS.DARK_GREY};
`;

export const StyledBody = styled.div`
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const StyledValue = styled.div`
	font-size: 1.5rem;
`;

export const SubHeading = styled.p`
	font-size: 12px;
	margin: 0;
	color: ${COLORS.GREY};
`;
