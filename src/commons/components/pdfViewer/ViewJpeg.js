import CloseIcon from '@mui/icons-material/Close';
import {isEmpty} from 'lodash';
import React from 'react';
import styled from 'styled-components';
import {Loader} from '../Loader';

const ViewerWrapper = styled.div`
	position: fixed;
	width: 100vw;
	height: 100vh;
	top: 0;
	left: 0;
	z-index: 1001;
	background: rgba(0, 0, 0, 0.23);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 10px;
`;

const CloseBtn = styled(CloseIcon)`
	position: absolute;
	top: 40px;
	right: 60px;
	z-index: 1002;
	cursor: pointer;
	fill: white;
	height: 40px;
	width: 40px;
	overflow: auto;
	border-radius: 5px;
`;

function ViewJpeg({base64Data, setJpgOpen}) {
	return (
		<ViewerWrapper>
			<CloseBtn
				onClick={() => {
					setJpgOpen(false);
				}}
			></CloseBtn>
			{isEmpty(base64Data) ? (
				<Loader />
			) : (
				<img width="1200" height="800" src={`data:image/jpeg;base64,  ${base64Data}`} />
			)}
		</ViewerWrapper>
	);
}

export default ViewJpeg;
