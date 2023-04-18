import {Button, TextField} from '@mui/material';
import {isNil} from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import MantysDataGrid from '../commons/components/Grid/MantysDataGrid';
import {saveData, setEditableParams} from '../redux/actions/planningActions';

const PlanningWrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100%;
	padding: 15px 10px;
`;
const DataPreview = styled.div`
	flex-grow: 1;
`;

const EditableCells = styled.div`
	display: flex;
	flex-wrap: wrap;
	background-color: white !important;
	padding: 10px 0px;
	width: 100%;
	gap: 5px;
`;

const Planning = (props) => {
	return (
		<PlanningWrapper>
			<EditableCells>
				<TextField
					id="outlined-basic"
					label="First"
					name="first"
					variant="outlined"
					inputProps={{inputMode: 'numeric', pattern: '[0-9]*'}}
					value={isNil(props.editableParams.first) ? '' : props.editableParams.first}
					size="small"
					onChange={(e) => {
						props.setEditableParams(e.target.name, e.target.value);
					}}
				/>
				<TextField
					id="outlined-basic"
					label="Second"
					name="second"
					variant="outlined"
					inputProps={{inputMode: 'numeric'}}
					value={isNil(props.editableParams.second) ? '' : props.editableParams.second}
					size="small"
					onChange={(e) => {
						props.setEditableParams(e.target.name, e.target.value);
					}}
				/>
				<TextField
					id="outlined-basic"
					label="Third"
					name="third"
					variant="outlined"
					inputProps={{inputMode: 'numeric'}}
					value={isNil(props.editableParams.third) ? '' : props.editableParams.third}
					size="small"
					onChange={(e) => {
						props.setEditableParams(e.target.name, e.target.value);
					}}
				/>
				<Button size="small" variant="contained" onClick={props.saveData()}>
					Save
				</Button>
			</EditableCells>
			<DataPreview>
				<MantysDataGrid data={props.data} />
			</DataPreview>
		</PlanningWrapper>
	);
};

export default connect(
	({planningState}) => {
		return {
			editableParams: planningState.editableParams,
			data: planningState.data
		};
	},
	(dispatch) => {
		return {
			setEditableParams: (name, value) => dispatch(setEditableParams(name, value)),
			saveData: () => dispatch(saveData())
		};
	}
)(Planning);
