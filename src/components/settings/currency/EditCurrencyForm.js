import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField} from '@mui/material';
import Button from '@mui/material/Button';
import React, {useState} from 'react';
import UiFilters from '../../../commons/components/Dashboard/Filter/UiFilters';

function EditCurrencyForm(props) {
	const [formData, setFormData] = useState({filters: [...props.filters]});

	return (
		<Dialog open={props.editorVisible} onClose={props.onClose} fullWidth maxWidth="xs">
			<DialogTitle>Edit</DialogTitle>
			<DialogContent>
				<DialogContentText>To add/update the currency rates please use the form below.</DialogContentText>
				<div style={{marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '5px'}}>
					{/*TODO User date picker instead of filters here*/}
					<UiFilters
						raised={'true'}
						hidePointInTime
						hideApplyButton
						filters={formData.filters}
						updateFilterValue={(f, id, val) => {
							f.forEach((fil) => {
								if (fil.filterId === id) {
									fil.value = val.toString();
								}
							});
							setFormData({filters: f});
						}}
					/>
					<TextField
						sx={{margin: '10px'}}
						margin="dense"
						label="Currency rate"
						type="number"
						variant="standard"
						value={formData.rate}
						onChange={(e) => setFormData({...formData, rate: e.target.value})}
					/>
				</div>
			</DialogContent>
			<DialogActions>
				<Button onClick={props.onClose}>Cancel</Button>
				<Button
					onClick={() => {
						props.onUpdate(formData);
					}}
				>
					Update
				</Button>
			</DialogActions>
		</Dialog>
	);
}

export default EditCurrencyForm;
