import React from 'react';
import styled from 'styled-components';
import {COLORS} from '../../styles/theme';
import {StyledTooltip} from './DataGridStyles';

const ErrorWrapper = styled.div`
	background-color: ${(props) => (props.error ? 'rgba(255, 0, 0, 0.171)' : 'transparent')};
	border: 1px solid ${COLORS.WHITE};
	padding: 10px 20px;
	position: absolute;
	display: flex;
	align-items: center;
	inset: 0;
	color: ${(props) => (props.showError ? 'red' : '')};
`;

export const CellComponent = ({showError, error, cellValue}) => {
	return (
		<StyledTooltip
			disableFocusListener
			disableTouchListener
			error={showError}
			showError={showError}
			// open={!!error}
			title={error}
			placement="top"
			arrow
		>
			<ErrorWrapper error={showError}>{cellValue}</ErrorWrapper>
		</StyledTooltip>
	);
};
