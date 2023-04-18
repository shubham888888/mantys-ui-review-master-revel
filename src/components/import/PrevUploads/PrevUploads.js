import {isEmpty, isNil} from 'lodash';
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import EmptyData from '../../../commons/components/Error/EmptyData';
import ErrorPage from '../../../commons/components/Error/ErrorPage';
import MantysDataGrid from '../../../commons/components/Grid/MantysDataGrid';
import {Loader} from '../../../commons/components/Loader';
import {PAGE_LINKS} from '../../../commons/constants';
import {API_FAILED, API_SUCCESS} from '../../../redux/actions/common/apiStatusConstants';
import {
	getPrevUploads,
	setCurrSelectedUpload,
	setUploadsApiStatus,
	showMorePrevUploads
} from '../../../redux/actions/prevUploadsActions';
import PrevUploadItem from './PrevUploadItem';
import {
	Entries,
	StatusWrapper,
	StyledButton,
	StyledLink,
	StyledPreview,
	StyledSidebar,
	StyledUploadEntry
} from './PrevUploadsStyles';

/***
 * Component for displaying past import status
 * @returns {JSX.Element}
 * @constructor
 *
 * @author haider
 */

function ImportStatus(props) {
	if (props.apiStatus === API_FAILED) return <ErrorPage error={{msg: 'Internal Server Error'}} />;

	const {id} = useParams();
	const UPLOADS_LIMIT = 5;

	useEffect(() => {
		props.getPrevUploads(UPLOADS_LIMIT, props.token);
	}, []);

	useEffect(() => {
		props.setCurrSelectedUpload(id, props.token, props.previousUploads);

		return () => {
			props.setUploadsApiStatus(null);
		};
	}, [id, props.previousUploads]);

	const showMorePreviousUploads = () => {
		props.showMorePrevUploads(3, props.page, props.token, props.previousUploads);
	};

	if (props.apiStatus != API_SUCCESS) return <Loader />;

	if (isEmpty(props.previousUploads)) {
		return <EmptyData message={'Could not find any previous uploads'} subHeading={'Try uploading some files'} />;
	}

	return (
		<StatusWrapper>
			{/* Sidebar  */}
			<StyledSidebar>
				<Entries>
					{!isNil(props.previousUploads) &&
						props.previousUploads.map((prevUpload, idx) => {
							return (
								<StyledLink
									key={idx}
									to={`/${PAGE_LINKS.IMPORT}/${PAGE_LINKS.IMPORT_STATUS}/${prevUpload.id}`}
								>
									<StyledUploadEntry onClick={(e) => {}} active={prevUpload.id == id}>
										<PrevUploadItem prevUpload={prevUpload} />
									</StyledUploadEntry>
								</StyledLink>
							);
						})}
				</Entries>
				{/* Show more button  */}
				<StyledButton onClick={showMorePreviousUploads}>Show More</StyledButton>
			</StyledSidebar>
			{/* Preview Window */}

			<StyledPreview>
				{!isEmpty(props.currSelectedUpload?.data) && (
					<MantysDataGrid
						data={props.currSelectedUpload.data}
						fileName={props.currSelectedUpload.name}
						excelAllowed={true}
					/>
				)}
			</StyledPreview>
		</StatusWrapper>
	);
}

export default connect(
	({prevUploadsState, auth}) => {
		return {
			token: auth.userDetails.jwtToken,
			previousUploads: prevUploadsState.prevUploads,
			currSelectedUpload: prevUploadsState.currSelectedUpload,
			page: prevUploadsState.currPage,
			apiError: prevUploadsState.apiError,
			apiStatus: prevUploadsState.uploadsApiStatus
		};
	},
	(dispatch) => {
		return {
			getPrevUploads: (step, token) => dispatch(getPrevUploads(step, token)),
			showMorePrevUploads: (step, page, token, currShownUploads) =>
				dispatch(showMorePrevUploads(step, page, token, currShownUploads)),
			setCurrSelectedUpload: (id, token, currShownUploads) =>
				dispatch(setCurrSelectedUpload(id, token, currShownUploads)),
			setUploadsApiStatus: (status) => dispatch(setUploadsApiStatus(status))
		};
	}
)(ImportStatus);
