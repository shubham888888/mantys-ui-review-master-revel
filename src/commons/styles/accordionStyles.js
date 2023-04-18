import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import {styled} from '@mui/material/styles';
import React from 'react';

/***
 * Styled components for Accordion
 *
 * @author mudit
 */

export const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(() => ({
	'&:not(:last-child)': {
		borderBottom: 0
	},
	'&:before': {
		display: 'none'
	},
	'& .css-1uw8sx8-MuiButtonBase-root-MuiAccordionSummary-root': {
		padding: '0 !important'
	},

	backgroundColor: 'white',
	flexGrow: 1,
	padding: '0 !important'
}));

export const AccordionSummary = styled((props) => (
	<MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{fontSize: '0.9rem'}} />} {...props} />
))(({theme}) => ({
	flexDirection: 'row-reverse',
	'& .MuiAccordionSummary-expandIconWrapper': {
		margin: '0 15px'
	},
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)'
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1)
	},
	'& .MuiButtonBase-root-MuiAccordionSummary-root': {
		padding: 0
	}
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({theme}) => ({
	padding: '0 !important',
	borderTop: '1px solid rgba(0, 0, 0, .125)'
}));
