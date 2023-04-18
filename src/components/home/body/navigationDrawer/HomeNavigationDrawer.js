import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import _, {isNil} from 'lodash';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Outlet, useNavigate} from 'react-router-dom';
import MaterialAccordion from '../../../../commons/components/Accordion';
import {MAIL_CONFIG} from '../../../../commons/constants';
import {COLORS} from '../../../../commons/styles/theme';
import {getViewsData} from '../../../../redux/actions/viewsActions';
import {MainBox, StyledDrawer, StyledList, StyledListItem} from './StylesNavigation';

/**
 * Component for displaying the Navigation Drawer
 *
 * @author mudit
 */

const drawerWidth = 280;

// * Links will redirect the user to other components using id

function HomeNavigationDrawer(props) {
	const navigate = useNavigate();
	useEffect(() => {
		props.getViewsData(props.authToken);
	}, []);

	return (
		<Box sx={{display: 'flex', justifyContent: 'space-between', width: '100vw', overflow: 'hidden', flexGrow: 1}}>
			<CssBaseline />
			<StyledDrawer
				variant="permanent"
				sx={{
					['& .MuiDrawer-paper']: {
						position: 'relative',
						width: drawerWidth,
						boxSizing: 'border-box',
						border: 'none !important'
					}
				}}
			>
				<Box sx={{backgroundColor: COLORS.LIGHT_BG_TRANSPARENT, height: '100%'}}>
					<List>
						{!_.isEmpty(props.viewsDataList) &&
							props.viewsDataList.map((section, id) => (
								<ListItem key={`${section.title}${id}`}>
									<MaterialAccordion
										expanded={section.id === props.currView?.type}
										title={section.title}
									>
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												backgroundColor: COLORS.LIGHT_BG_TRANSPARENT
											}}
										>
											<StyledList>
												{section.children
													.sort((a, b) =>
														!isNil(a.config?.order) && !isNil(b.config?.order)
															? a.config.order - b.config.order
															: 0
													)
													.map((item, index) => {
														return (
															<StyledListItem
																state={
																	item.id === props.currView?.id
																		? 'active'
																		: 'inactive'
																}
																key={`${item.title}${index}`}
															>
																<ListItemButton
																	sx={{ml: 3}}
																	onClick={() => navigate(item.link)}
																>
																	<ListItemIcon>{item.icon}</ListItemIcon>
																	<ListItemText primary={item.label} sx={{ml: -3}} />
																</ListItemButton>
															</StyledListItem>
														);
													})}
											</StyledList>
											<Button
												href={
													'mailto:' +
													MAIL_CONFIG.NEW_VIEW.RECIPIENT +
													'?subject=' +
													MAIL_CONFIG.NEW_VIEW.SUBJECT
												}
												target="_blank"
												size="small"
												variant="text"
												style={{marginTop: '15px'}}
											>
												+ Add new
											</Button>
										</div>
									</MaterialAccordion>
								</ListItem>
							))}
					</List>
				</Box>
			</StyledDrawer>
			<MainBox component="main">
				<Outlet />
			</MainBox>
		</Box>
	);
}

export default connect(
	({viewsState, auth}) => {
		return {
			viewsDataList: viewsState.viewsDataList,
			currView: viewsState.currView,
			authToken: auth.userDetails.jwtToken
		};
	},
	(dispatch) => {
		return {
			getViewsData: (token) => dispatch(getViewsData(token))
		};
	}
)(HomeNavigationDrawer);
