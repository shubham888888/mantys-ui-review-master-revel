import {Button, Tooltip, Typography} from '@mui/material';
import {styled as muiStyled} from '@mui/material/styles';
import {DataGrid, gridClasses} from '@mui/x-data-grid';
import React from 'react';
import styled from 'styled-components';
import {COLORS, GRID_SHADOW} from '../../styles/theme';

export const GridLayoutWrapper = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	height: 100%;
	border-radius: 8px;
	box-shadow: ${GRID_SHADOW};
	background-color: ${COLORS.WHITE};
	padding: 10px;

	.css-s1v7zr-MuiDataGrid-virtualScrollerRenderZone:nth-child(2n) {
		background-color: ${COLORS.WHITESMOKE_LIGHT} !important;
	}
`;

export const StyledHeader = styled.div`
	display: flex;
	padding: 20px;
	gap: 0.8rem;
	flex-direction: column;
	align-items: center;
	border-radius: 8px;
	justify-content: center;
`;
export const StyledFilters = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;
	width: 100%;
	flex-wrap: wrap;
	gap: 1rem;
`;

export const ActionsWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
`;

export const FileDetails = styled.div`
	border-radius: 8px;
	display: flex;
`;
export const StyledName = styled(Typography)`
	//font-weight: 600 !important;
	color: ${COLORS.GREY_BLACK};
`;

export const StyledButton = styled(Button)`
	background-color: ${(props) => props.bg_color} !important;
	font-weight: bold !important;
	min-width: 120px !important;
	white-space: nowrap;
	overflow: hidden;
`;

export const DataGridStyled = muiStyled(DataGrid)(({theme}) => ({
	[`& .${gridClasses.row}.even`]: {
		backgroundColor: `${COLORS.GREY} !important`,
		position: 'relative !important'
	},

	fontFamily: [
		'-apple-system',
		'BlinkMacSystemFont',
		'"Segoe UI"',
		'Roboto',
		'"Helvetica Neue"',
		'Arial',
		'sans-serif',
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"'
	].join(','),

	border: 'none !important',
	outline: 'none !important',
	flexGrow: 1,
	'& .css-1w5m2wr-MuiDataGrid-virtualScroller': {
		overflow: 'hidden',
		transition: 'all 0.5s ease'
	},
	'& .css-1w5m2wr-MuiDataGrid-virtualScroller:hover': {
		overflow: 'auto'
	},
	'& .MuiDataGrid-iconSeparator': {
		display: 'none'
	},
	'& .css-1oj2twp-MuiPagination-root': {
		marginRight: '15px'
	},

	// paginations styling
	'& .css-1mdhusq-MuiButtonBase-root-MuiPaginationItem-root.Mui-selected': {
		color: `${COLORS.WHITE}`,
		backgroundColor: `${COLORS.PRIMARY}`,
		border: 'none'
	},

	'&  .MuiDataGrid-columnHeader': {
		paddingInline: '20px !important',
		outline: 'none !important'
		// borderRight: `1px solid ${COLORS.GREY} !important`
	},

	'&  .MuiDataGrid-columnHeaders': {
		borderBottom: `0.5px solid ${COLORS.PRIMARY}`
	},

	'& .MuiDataGrid-footerContainer': {
		borderTop: `0.5px solid ${COLORS.PRIMARY}`
	},

	// padding for cells and headers
	'& .MuiDataGrid-cell': {
		padding: '10px 20px',
		position: 'relative',
		border: 'none !important'
	},

	'& .MuiDataGrid-cell.MuiDataGrid-cell--editing': {
		boxShadow: 'none',
		outline: 'none !important',
		border: 'none !important',
		backgroundColor: 'transparent !important'
	},
	'& .MuiDataGrid-virtualScroller': {
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: `${COLORS.PRIMARY_SCROLL}`
		}
	},
	'& .MuiDataGrid-cell, & .MuiDataGrid-columnHeaderTitle': {
		textOverflow: 'clip'
	},
	'& .MuiDataGrid-columnHeaderTitle': {
		fontWeight: 'bold !important',
		color: `${COLORS.PRIMARY_DARK}`
	},
	'& .mantys-data-grid-highlight-row': {
		backgroundColor: `${COLORS.PRIMARY_LIGHT}`
	},
	'& .mantys-data-grid-secondary-color-highlight-row': {
		backgroundColor: `${COLORS.PRIMARY_LIGHT_GREEN}`
	},
	'& .mantys-data-grid-cell-bold': {
		fontWeight: 'bold'
	},
	'& .mantys-data-grid-cell-green': {
		backgroundColor: `${COLORS.PRIMARY_LIGHT_GREEN}`
	},
	'& .mantys-data-grid-cell-red': {
		backgroundColor: `${COLORS.LIGHT_RED}`
	},
	'& .mantys-data-grid-cell-yellow': {
		backgroundColor: `${COLORS.LIGHT_YELLOW}`
	},
	'& .mantys-data-grid-row:hover': {
		backgroundColor: `${COLORS.WHITESMOKE_LIGHT}`
	},
	'& .mantys-data-grid-first-column': {
		backgroundColor: `${COLORS.LIGHT_BG}`
	}
}));

export const StyledTooltip = styled(({className, ...props}) => <Tooltip {...props} classes={{popper: className}} />)`
	& .MuiTooltip-tooltip {
		background: ${(props) => (props.showError ? 'red' : '')};
		font-weight: bold;
		color: white;
	}
	& .MuiTooltip-arrow {
		color: ${(props) => (props.showError ? 'red' : '')};
	}
`;
