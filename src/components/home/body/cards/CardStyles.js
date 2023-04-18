import Card from '@mui/material/Card';
import styled from 'styled-components';
import {CARD_SHADOW} from '../../../../commons/styles/theme';

/**
 * Styles for the card layout
 *
 * @author mudit
 */

export const LayoutContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const StyledLabel = styled.span`
	font-weight: 550;
	font-size: 1rem;
`;

export const CardContainer = styled(Card)`
	display: flex;
	flex-grow: 1;
	flex-direction: column;
	justify-content: center;
	background-color: ${(props) => props.background} !important;
	font-size: 16px;
	font-family: Roboto, sans-serif;
	box-shadow: ${CARD_SHADOW};
	border-radius: 8px;
`;

export const MainHeading = styled.div`
	display: flex;
	align-items: center;
	width: 100%;
	height: 100%;
`;
export const SubHeading = styled.div``;
