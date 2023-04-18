import {Typography} from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import styled from 'styled-components';
import {devices} from '../../commons/components/commons';
import {COLORS} from '../../commons/styles/theme';

/**
 * Page layout for the login page
 * @type {StyledComponent<"div", AnyIfEmpty<>, {}, never>}
 */

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
`;

export const Layout = styled.div`
	display: flex;
	flex-grow: 1;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	overflow: auto;
`;

/**
 * Image container for the login page
 * @type {StyledComponent<"img", AnyIfEmpty<>, {}, never>}
 */
export const ImageContainer = styled.div`
	display: flex;
	align-items: center;
	height: 100%;
	max-width: 60vw;
	@media ${devices.tablet} {
		display: none !important;
	}
`;
export const Image = styled.img`
	width: 100%;
	max-width: 1000px;
	object-fit: contain;

	@media ${devices.tablet} {
		display: none !important;
	}
`;

/**
 * Container for the login form
 * @type {StyledComponent<"div", AnyIfEmpty<>, {}, never>}
 */
export const LoginFormContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 90% !important;
	height: 100%;
	max-width: 320px;
	align-items: center;
	justify-content: center;
	margin-inline: 45px;
	@media ${devices.tablet} {
		margin: 0 !important;
	}
	@media ${devices.laptop} {
		max-width: 330px !important;
	}
	@media ${devices.laptopL} {
		max-width: 400px;
	}
`;

export const CopyrightWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;
export const CopyrightContent = styled.div`
	background-color: ${COLORS.WHITE};
	display: flex;
	justify-content: flex-end;
	padding: 15px 20px;
`;
/**
 * Container for the login form
 * @type {StyledComponent<"div", AnyIfEmpty<>, {}, never>}
 */
export const LoginForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	gap: 18px;
	justify-content: center;
`;

/**
 * Input fields for the login form
 */
export const InputFields = styled(TextField)`
	width: 100%;
	background: ${COLORS.LIGHT_GREY};

	& fieldset {
		border-radius: 6px;
		border-color: ${COLORS.LIGHT_GREY};
	}
	border-radius: 6px !important;

	@media ${devices.mobileS} {
		width: 83vw;
	}
`;

/**
 * Text display for the app name title
 */
export const Title = styled(Button)`
	font-size: 30px !important;
	color: black !important;
	font-weight: bold;
	margin-top: -20px !important;
	margin-bottom: 20px !important;
`;

/**
 * Styled components for the Login page
 *
 * @author mudit
 */
export const LoginButton = styled(Button)`
	width: 100%;
	padding: 6px;
	font-size: 16px !important;
	font-weight: bold !important;
	text-transform: capitalize !important;
	border-radius: 6px !important;

	@media ${devices.mobileS} {
		width: 83vw;
	}
`;

export const StyledTextLink = styled(Typography)`
	cursor: pointer;
	color: ${COLORS.PRIMARY};
	text-align: center;
`;

export const StyledAnchor = styled.a`
	color: ${COLORS.PRIMARY};
`;
