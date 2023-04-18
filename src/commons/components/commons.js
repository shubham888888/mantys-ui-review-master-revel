import {Typography} from '@mui/material';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {COLORS} from '../styles/theme';

const sizes = {
	mobileS: '320px',
	mobileM: '375px',
	mobileL: '425px',
	tablet: '768px',
	laptop: '1024px',
	laptopL: '1440px',
	desktop: '2560px'
};

export const devices = {
	mobileS: `(max-width: ${sizes.mobileM})`,
	mobileM: `(max-width: ${sizes.mobileL})`,
	mobileL: `(max-width: ${sizes.tablet})`,
	tablet: `(max-width: ${sizes.laptop})`,
	laptop: `(max-width: ${sizes.laptopL})`,
	laptopL: `(max-width: ${sizes.desktop})`,
	desktop: `(min-width: ${sizes.desktop})`
};

/**
 * Horizontal Divider
 * @type {StyledComponent<"div", AnyIfEmpty<>, {}, never>}
 */
export const HorizontalDivider = styled.div`
	height: ${(props) => (props.height ? props.height : '1px')};
	background: ${COLORS.GREY};
	text-align: center;
	width: 96%;
	right: 32px;
	left: 32px;
	margin-inline: auto;
	bottom: 48px;
`;

/**
 * Copyright footer for the app
 * @type {StyledComponent<"div", AnyIfEmpty<>, {}, never>}
 */
export const Copyright = styled(Typography)`
	right: 32px;
	bottom: 16px;

	@media ${devices.mobileM} {
		font-size: 4vw !important;
		width: 100%;
		left: 0;
		display: block;
		text-align: center;
	}
`;

export const CustomLink = styled(Link)`
	cursor: pointer;
	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		color: ${COLORS.PRIMARY};
	}
	font-size: 14px;
`;
