import {InfoOutlined} from '@mui/icons-material';
import LaunchTwoToneIcon from '@mui/icons-material/LaunchTwoTone';
import {Tooltip} from '@mui/material';
import parse from 'html-react-parser';
import _ from 'lodash';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {COLORS} from '../../styles/theme';
import {exportToExcel} from '../../utils/GridUtils';
import {getConnectedReportLink} from '../../utils/viewsUtils';
import {ActionsWrapper, FileDetails, StyledButton, StyledName} from './DataGridStyles';

const LinkIcon = styled(LaunchTwoToneIcon)`
	margin: 5px 10px;
	color: ${COLORS.PRIMARY};
`;

const GridHeaderItems = ({fileName, infoText, connectedReportId, excelAllowed, data}) => {
	const [openStatus, setOpenStatus] = useState(false);
	return (
		<ActionsWrapper>
			<FileDetails>
				{!_.isEmpty(fileName) && <StyledName component="h2">{fileName}</StyledName>}
				{!_.isEmpty(infoText) && (
					<Tooltip placement="right" open={openStatus} title={parse(infoText)}>
						<span
							style={{marginLeft: '10px'}}
							onMouseEnter={() => {
								setOpenStatus(true);
							}}
							onMouseLeave={() => {
								setOpenStatus(false);
							}}
						>
							<InfoOutlined color="primary" />
						</span>
					</Tooltip>
				)}
				{!_.isNil(connectedReportId) && (
					<Link to={getConnectedReportLink(connectedReportId)}>
						<LinkIcon fontSize="20px" />
					</Link>
				)}
			</FileDetails>
			{excelAllowed && (
				<StyledButton
					size="small"
					variant="contained"
					bg_color={COLORS.SUCCESS}
					onClick={() => {
						exportToExcel(data, fileName);
					}}
				>
					Export to Excel
				</StyledButton>
			)}
		</ActionsWrapper>
	);
};

export default GridHeaderItems;
