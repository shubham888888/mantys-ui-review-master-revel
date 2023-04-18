import {Typography} from '@mui/material';
import React from 'react';
import styled from 'styled-components';

const EmptyWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	flex-grow: 1;
`;

const NotFoundHeading = styled(Typography)`
	font-weight: bold;
	font-size: 1.8rem;
`;

const EmptyData = ({message, subHeading}) => {
	return (
		<EmptyWrapper>
			<NotFoundHeading component="h2">{message}</NotFoundHeading>
			<Typography>{subHeading}</Typography>
		</EmptyWrapper>
	);
};

export default EmptyData;
