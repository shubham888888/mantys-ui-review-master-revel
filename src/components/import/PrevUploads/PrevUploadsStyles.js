import {Button} from '@mui/material';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {COLORS} from '../../../commons/styles/theme';

export const StatusWrapper = styled.section`
	display: flex;
	justify-content: space-between;
	overflow: hidden;
	width: 100vw;
	flex-grow: 1;
`;

export const StyledSidebar = styled.div`
	width: 20%;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	border-right: 1.5px solid ${COLORS.LIGHT_GREY};
`;

export const Entries = styled.div`
	margin-top: 10px;
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	gap: 10px;
	overflow: auto;
`;

export const StyledUploadEntry = styled.div`
	cursor: pointer;
	border-radius: 5px;
	margin-inline: 10px;
	text-transform: capitalize;
	padding: 1.5vmin 3vmin;
	font-size: 18px;
	color: ${(props) => (props.active ? COLORS.PRIMARY : COLORS.BLACK)};
	background-color: ${(props) => (props.active ? COLORS.PRIMARY_TRANSPARENT : COLORS.WHITE)};

	transition: all 0.5s ease;

	&:hover {
		background-color: ${(props) => (props.active ? COLORS.PRIMARY_LIGHT : COLORS.WHITESMOKE_LIGHT)};
	}
`;

export const StyledButton = styled(Button)`
	margin-bottom: 10px !important;
`;

export const StyledPreview = styled.div`
	padding: 20px;
	overflow: auto;
	flex-grow: 1;
	right: 0;
`;

export const StyledLink = styled(Link)`
	text-decoration: none !important;
`;
