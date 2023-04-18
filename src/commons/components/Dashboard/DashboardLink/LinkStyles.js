import styled from 'styled-components';
import {COLORS} from '../../../styles/theme';

export const LinkWrapper = styled.div`
	position: absolute;
	right: 0;
	top: 0;
	padding: 10px;
	cursor: pointer;
	color: ${COLORS.PRIMARY};
	&:hover {
		transform: scale(1.03);
	}
`;
