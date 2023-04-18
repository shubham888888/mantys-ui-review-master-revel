import IosShareIcon from '@mui/icons-material/IosShare';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import {Menu, MenuItem} from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import React from 'react';
import {connect} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {PAGE_LINKS} from '../../../commons/constants';
import {logout} from '../../../redux/actions/authActions';
import {APP_BAR_THEME as THEME} from './AppHeaderStyles';

/**
 * Icons for the app bar
 * @returns {JSX.Element}
 * @constructor
 */
function AppBarIcons(props) {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const appBarIcons = [
		// {
		// 	title: 'Notifications',
		// 	icon: (
		// 		<Badge
		// 			variant={THEME.badgeStyle.variant}
		// 			color={THEME.badgeStyle.color}
		// 			anchorOrigin={THEME.badgeStyle.placement}
		// 		>
		// 			<NotificationsIcon />
		// 		</Badge>
		// 	)
		// },
		{
			title: 'Import Data',
			link: '/' + PAGE_LINKS.IMPORT,
			icon: <IosShareIcon />,
			onClick: () => {
				navigate('/' + PAGE_LINKS.IMPORT);
			}
		},
		// {
		// 	title: 'Resources',
		// 	icon: <LibraryBooksIcon />
		// },
		// {
		// 	title: 'Help',
		// 	icon: <HelpCenter />
		// },
		{
			title: 'Settings',
			icon: <div style={{display: 'flex', alignItems: 'center'}}>
				<Tooltip title={""}><SettingsIcon onClick={handleClick}/></Tooltip>
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						'aria-labelledby': 'basic-button'
					}}
					transformOrigin={{
						vertical: "top",
						horizontal: "right"
					}}
				>
					<MenuItem sx={{width: 200}} onClick={() => navigate('/' + PAGE_LINKS.CURRENCY)}>Currency</MenuItem>
				</Menu>
			</div>,
			onClick: () => {

			}
		},
		{
			title: 'Logout',
			onClick: () => {
				props.logout();
			},
			icon: <LogoutIcon />
		}
	];

	return (
		<Box sx={{display: {xs: 'none', md: 'flex', alignItems: 'center', gap: '24px'}}}>
			{appBarIcons.map((item, key) => (
				<Tooltip title={open ? null : item.title} key={'appBarIcons' + key}>
					<IconButton size={THEME.iconSize} color={THEME.color} onClick={item.onClick}>
						{item.icon}
					</IconButton>
				</Tooltip>
			))}
		</Box>
	);
}

export default connect(null, (dispatch) => {
	return {
		logout: () => dispatch(logout())
	};
})(AppBarIcons);
