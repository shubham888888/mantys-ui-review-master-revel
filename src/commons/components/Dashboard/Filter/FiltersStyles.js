import {Button, FormControl, Select} from '@mui/material';
import styled from 'styled-components';
import {CARD_SHADOW, COLORS} from '../../../styles/theme';

export const StyledFormControl = styled(FormControl)`
	background-color: ${COLORS.WHITE};
	box-shadow: 12.5px 12.5px 10px rgba(0, 0, 0, 0.01), 100px 100px 80px rgba(0, 0, 0, 0.005);
	/* outline: none !important; */
	/* border: none !important; */
	& .MuiOutlinedInput-notchedOutline {
		border: none !important;
		box-shadow: ${(props) => (props.raised === 'true' ? CARD_SHADOW : 'none')} !important;
		outline: none !important;
	}
`;

export const StyledSelect = styled(Select)`
	/* border: none; */
`;

export const Wrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;

	justify-content: space-between;
`;

export const FiltersWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
	margin-inline: ${(props) => props.inlineMargin};
`;

export const StyledButton = styled(Button)`
	font-weight: bold;
`;

export const PointInTimeToggle = styled.div`
	display: flex;
	align-items: center;
`;

export const StyledToggleButton = styled(Button)`
	font-weight: bold;
	padding-inline: 10px;
	transition: all 0.2s ease;
`;
