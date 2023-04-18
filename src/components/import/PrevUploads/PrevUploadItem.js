import React from 'react';
import {DetailsDiv, DetailsItem, NameHeader} from './UploadItemStyles';

// Component for previous upload item
const PrevUploadItem = ({prevUpload}) => {
	return (
		<>
			<NameHeader>{prevUpload.name}</NameHeader>
			<DetailsDiv>
				{prevUpload.date && <DetailsItem>Date - {prevUpload.date}</DetailsItem>}
				{prevUpload.by && <DetailsItem>By - {prevUpload.by}</DetailsItem>}
			</DetailsDiv>
		</>
	);
};

export default PrevUploadItem;
