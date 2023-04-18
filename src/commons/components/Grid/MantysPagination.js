import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector} from '@mui/x-data-grid';
import React from 'react';

export default function MantysPagination() {
	const apiRef = useGridApiContext();
	const page = useGridSelector(apiRef, gridPageSelector);
	const pageCount = useGridSelector(apiRef, gridPageCountSelector);

	return (
		<Pagination
			color="primary"
			variant="outlined"
			shape="rounded"
			page={page + 1}
			count={pageCount}
			renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
			onChange={(event, value) => apiRef.current.setPage(value - 1)}
		/>
	);
}
