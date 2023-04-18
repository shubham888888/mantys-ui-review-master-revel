import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import {useNavigate} from 'react-router-dom';
import {CustomLink} from '../../../commons/components/commons';
import {PAGE_LINKS} from '../../../commons/constants';
import {COLORS} from '../../../commons/styles/theme';
import Logo from '../../../resources/logo/logo.png';
import AppBarIcons from './AppBarIcons';
import {APP_BAR_THEME as THEME, StyledNavbar} from './AppHeaderStyles';

/**
 * Component for the app bar header
 * @returns {JSX.Element}
 * @constructor
 */
export default function AppHeader() {
	const navigate = useNavigate();
	return (
		<StyledNavbar>
			<AppBar sx={{backgroundColor: COLORS.WHITE, boxShadow: 'none'}}>
				<Toolbar>
					<IconButton
						color={THEME.color}
						onClick={() => {
							navigate(PAGE_LINKS.HOME);
						}}
					>
						<img src={Logo} alt="Not found" width="65" height="65" />
					</IconButton>
					<CustomLink to={PAGE_LINKS.HOME} style={{textDecoration: 'none'}}>
						<Typography variant="subtitle1" color="primary">
							MANTYS
						</Typography>
					</CustomLink>
					<Box sx={{flexGrow: 1}} />
					{/* <Search>
						<SearchIconWrapper>
							<SearchIcon color={THEME.color} />
						</SearchIconWrapper>
						<StyledInputBase placeholder="Search" />
					</Search> */}
					<AppBarIcons />
				</Toolbar>
			</AppBar>
		</StyledNavbar>
	);
}
