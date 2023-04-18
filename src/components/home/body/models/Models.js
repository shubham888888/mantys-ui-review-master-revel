import Button from '@mui/material/Button';
import {uniqueId} from 'lodash';
import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {lineGraphOptions} from '../../../../commons/components/Charts/CustomChart';
import {getModelsDataById} from '../../../../redux/actions/modelsActions';
import {graphBasicData} from '../../../../sample_data/SampleModel';
import {InputFields} from '../../../login/LoginStyles';
import CustomGridItemComponent from '../cards/CardLayout';

/**
 * Model component
 *
 * @author mudit
 */

function Model(props) {
	const {id} = useParams();
	useEffect(() => {
		props.getModelData(id, props.token);
	}, [id]);

	useEffect(() => {
		updateData();
	}, [id]);

	const [data, setData] = useState(graphBasicData);

	const [form, setForm] = useState({
		churn: 0.1,
		rpc: 100,
		cac: 5,
		downsell: 0.5,
		upsell: 1.1,
		cogs: 40
	});

	const expectedData = [20, 25, 61, 72, 71, 96, 122];

	const inputHandler = (e) => {
		setForm({...form, [e.target.name]: parseFloat(e.target.value)});
	};

	const updateData = () => {
		const newData = {...graphBasicData};
		const newArray = expectedData.map(
			(d) =>
				d.toFixed(2) *
				form.churn.toFixed(2) *
				form.rpc.toFixed(2) *
				form.cac.toFixed(2) *
				form.downsell.toFixed(2) *
				form.upsell.toFixed(2) *
				((100 - form.cogs) / 100).toFixed(2)
		);
		newData.datasets[0].data = [...newArray];
		setData(newData);
	};

	return (
		<>
			<div style={{padding: '20px 10px', display: 'flex', gap: '10px', background: '#ffffff'}}>
				<InputFields
					label="Revenue per customer"
					name="rpc"
					value={form.rpc}
					onChange={inputHandler}
					autoComplete="off"
					type="number"
				/>
				<InputFields
					label="Churn"
					name="churn"
					value={form.churn}
					onChange={inputHandler}
					autoComplete="off"
					type="number"
				/>
				<InputFields
					label="CAC"
					name="cac"
					value={form.cac}
					onChange={inputHandler}
					autoComplete="off"
					type="number"
				/>
				<InputFields
					label="Downsell %"
					name="downsell"
					value={form.downsell}
					onChange={inputHandler}
					autoComplete="off"
					type="number"
				/>
				<InputFields
					label="Upsell %"
					name="upsell"
					value={form.upsell}
					onChange={inputHandler}
					autoComplete="off"
					type="number"
				/>
				<InputFields
					label="COGS %"
					name="cogs"
					value={form.cogs}
					onChange={inputHandler}
					autoComplete="off"
					type="number"
				/>
				<Button
					variant="contained"
					onClick={() => {
						const newData = {...graphBasicData};
						const newArray = expectedData.map(
							(d) =>
								d.toFixed(2) *
								form.churn.toFixed(2) *
								form.rpc.toFixed(2) *
								form.cac.toFixed(2) *
								form.downsell.toFixed(2) *
								form.upsell.toFixed(2) *
								((100 - form.cogs) / 100).toFixed(2)
						);
						newData.datasets[0].data = [...newArray];
						setData(newData);
					}}
				>
					Apply
				</Button>
			</div>
			<CustomGridItemComponent
				key={uniqueId('key')}
				label={'Plan vs Actuals'}
				background={'#ffffff'}
				type={'line-graph'}
				value={<Line options={lineGraphOptions} data={data} />}
			/>
		</>
	);
}

export default connect(
	({modelsState, auth}) => {
		return {
			modelData: modelsState.modelData,
			token: auth.userDetails.jwtToken
		};
	},
	(dispatch) => {
		return {
			getModelData: (id, token) => dispatch(getModelsDataById(id, token))
		};
	}
)(Model);
