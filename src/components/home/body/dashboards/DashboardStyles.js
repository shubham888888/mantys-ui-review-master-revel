/**
 * Styles for dashboard
 *
 * @author mudit
 */

import {styled as muiStyled} from '@mui/material/styles';
import Tooltip, {tooltipClasses} from '@mui/material/Tooltip';
import React from 'react';
import styled from 'styled-components';

export const LightTooltip = muiStyled(({className, ...props}) => <Tooltip {...props} classes={{popper: className}} />)(
	({theme}) => ({
		[`& .${tooltipClasses.tooltip}`]: {
			fontSize: 11
		}
	})
);

export const DashboardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	padding: 15px 0;
	height: 100%;
`;
