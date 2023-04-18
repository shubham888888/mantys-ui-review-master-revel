import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';

export const Loader = () => {
	return (
		<div style={{height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden'}}>
			<Box
				sx={{
					display: 'flex',
					height: '100%',
					alignItems: 'center',
					justifyContent: 'center',
					flexDirection: 'column'
				}}
			>
				<CircularProgress />
			</Box>
		</div>
	);
};
