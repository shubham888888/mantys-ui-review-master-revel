import {TextField} from '@mui/material';
import Button from '@mui/material/Button';
import {isEmpty, isNil, toNumber} from 'lodash';
import React, {useState} from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import {updateAssumptions} from '../../../redux/actions/reportsActions';
import {getRequestBodyFromFilters} from '../../utils/viewsUtils';
import {HorizontalDivider} from '../commons';

const FieldsWrappper = styled.div`
	display: flex;
	justify-content: flex-start;
	width: 100%;
	gap: 10px;
`;

const EditableGridFields = (props) => {
	const [fields, setFields] = useState({});
	if (isEmpty(props.editableFields)) {
		return <></>;
	}

	props.editableFields?.forEach((field) => {
		if (isNil(fields[field.id])) {
			fields[field.id] = props.fieldValues[field.name];
		}
	});

	return (
		<div style={{display: 'flex', flexDirection: 'column', width: '100%', gap: '30px', marginTop: '10px'}}>
			<HorizontalDivider />
			<FieldsWrappper>
				{props?.editableFields?.map((field, index) => {
					return (
						<TextField
							key={index}
							id="outlined-basic"
							label={field.name}
							name={field.name}
							variant="outlined"
							inputProps={{inputMode: 'numeric'}}
							value={isNil(fields[field.id]) ? '' : fields[field.id]}
							size="small"
							onChange={(e) => {
								const newFields = {...fields};
								newFields[field.id] = isNaN(e.target.value) ? 0 : e.target.value;
								setFields(newFields);
							}}
						/>
					);
				})}
				<Button
					variant="contained"
					onClick={() => {
						const obj = getRequestBodyFromFilters(props.filters, null);
						const inputs = Object.entries(fields).map(([key, val]) => {
							return {
								input_id: toNumber(key),
								data: toNumber(val)
							};
						});
						const payload = {
							filters: obj.body,
							vt_begin: obj.body?.startDate,
							vt_end: obj.body?.endDate,
							inputs
						};
						props.updateAssumptions(props.viewId, payload);
					}}
				>
					Forecast
				</Button>
			</FieldsWrappper>
		</div>
	);
};

export default connect(
	({reportsState, viewsState}) => {
		return {
			editableFields: reportsState.editableFields,
			filters: reportsState.filters,
			viewId: viewsState.currView.object_id,
			fieldValues: reportsState.fieldValues
		};
	},
	(dispatch) => {
		return {
			updateAssumptions: (objectId, payload) => dispatch(updateAssumptions(objectId, payload))
		};
	}
)(EditableGridFields);
