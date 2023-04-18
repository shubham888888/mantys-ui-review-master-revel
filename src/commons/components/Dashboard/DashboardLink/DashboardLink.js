import ArrowOutward from '@mui/icons-material/ArrowOutward';
import {isNil} from 'lodash';
import React from 'react';
import {Link} from 'react-router-dom';
import {PAGE_LINKS} from '../../../constants';
import {LinkWrapper} from './LinkStyles';

function DashboardLink({connectedReportId}) {
	if (isNil(connectedReportId)) return <></>;
	return (
		<Link to={'/' + PAGE_LINKS.REPORTS + '/' + connectedReportId}>
			<LinkWrapper>
				<ArrowOutward fontSize={'16px'} />
			</LinkWrapper>
		</Link>
	);
}

export default DashboardLink;
