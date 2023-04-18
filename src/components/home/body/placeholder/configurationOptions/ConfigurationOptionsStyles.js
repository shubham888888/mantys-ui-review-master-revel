import Button from '@mui/material/Button';
import styled from 'styled-components';

/**
 * Styled components for the configuration options shown on the placeholder page
 *
 * @author mudit
 */

export const OptionContainer = styled.div`
	display: flex;
	gap: 36px;
	margin: 32px 0;
`;

export const OptionDetails = styled.div`
	display: flex;
	flex-direction: column;
	font-size: 16px;
	justify-content: center;
	align-self: center;
	font-family: Roboto, sans-serif;
	gap: 6px;
`;

export const OptionLinks = styled.div`
	display: flex;
	gap: 24px;
`;

export const LinkButton = styled(Button)`
	border-radius: 8px !important;
	border: 2px solid !important;
	font-weight: bold !important;
	text-transform: capitalize !important;
	width: 200px;
`;
