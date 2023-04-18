import {isEmpty} from 'lodash';
import React from 'react';
import {nFormatter} from '../../utils/commonUtils';
import {StyledBody, StyledLabel, StyledValue, SubHeading, Wrapper} from './BoxStyles';

const BoxWrapper = ({value, label}) => {
	const prefix = !isEmpty(value.prefix) ? value.prefix : '';
	const suffix = !isEmpty(value.suffix) ? value.suffix : '';
	const subtext = !isEmpty(value.subtext) ? value.subtext : '';
	return (
		<Wrapper>
			<StyledBody>
				<StyledValue>{prefix + nFormatter(value.data, 2) + suffix}</StyledValue>
			</StyledBody>
			<StyledLabel>{label}</StyledLabel>
			<SubHeading>{subtext}</SubHeading>
		</Wrapper>
	);
};

export default BoxWrapper;
