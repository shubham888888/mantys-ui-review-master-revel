import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import {styled} from '@mui/material/styles';
import {COLORS} from '../../../commons/styles/theme';

/**
 * Styles for the app header
 *
 * @author mudit
 */

export const Search = styled('div')(({theme}) => ({
	position: 'relative',
	borderRadius: '16px',
	backgroundColor: COLORS.LIGHT_GREY,
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto'
	}
}));

export const SearchIconWrapper = styled('div')(({theme}) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}));

export const StyledInputBase = styled(InputBase)(({theme}) => ({
	color: 'primary',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch'
		}
	}
}));

export const APP_BAR_THEME = {
	color: 'primary',
	iconSize: 'medium',
	badgeStyle: {
		placement: {vertical: 'bottom', horizontal: 'right'},
		color: 'error',
		variant: 'dot'
	}
};

/**
 * Styles for the Navbar for whole application
 * @feature
 * @author haider
 */
export const StyledNavbar = styled(Box)`
	position: sticky !important;
	top: 0 !important;
	z-index: 1000 !important;
	& > header {
		position: sticky;
		top: 0;
	}
`;
