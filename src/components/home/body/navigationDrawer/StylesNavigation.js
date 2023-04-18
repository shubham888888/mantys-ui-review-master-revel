import {Drawer, List, ListItem} from '@mui/material';
import {Box} from '@mui/system';
import styled from 'styled-components';
import {COLORS} from '../../../../commons/styles/theme';

export const MainBox = styled(Box)`
	flex-grow: 1;
	overflow: auto;
`;

export const StyledDrawer = styled(Drawer)`
	width: drawerWidth;
	z-index: 100;
	border: none !important;
`;

export const StyledList = styled(List)`
	display: flex;
	flex-direction: column;
	gap: 8px;
	margin-top: 4px !important;
`;

export const StyledListItem = styled(ListItem)`
	padding: 0 !important;
	& .css-15amvg6-MuiButtonBase-root-MuiListItemButton-root {
		padding: 8px 16px 8px 20px;
		border-radius: 4px;
	}
	background-color: ${(props) => {
		return props.state === 'active' ? COLORS.PRIMARY_TRANSPARENT : COLORS.LIGHT_BG_TRANSPARENT;
	}};
	border-radius: 4px;
	color: ${(props) => props.state === 'active' && COLORS.PRIMARY} !important;
	& svg {
		fill: ${(props) => props.state === 'active' && COLORS.PRIMARY} !important;
	}
`;
