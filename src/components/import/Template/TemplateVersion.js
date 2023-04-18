import {Autocomplete, TextField} from '@mui/material';
import React from 'react';
import {connect} from 'react-redux';
import {setVersion} from '../../../redux/actions/fileImportActions';
import {getBufferedDays, getBufferedMonths, getBufferedWeeks, getBufferedYears} from './utils';

const TemplateVersion = (props) => {
	const getOptions = (freq, buffer) => {
		switch (freq) {
			case 'YEARLY':
				return getBufferedYears(buffer);
			case 'MONTHLY':
				return getBufferedMonths(buffer);
			case 'WEEKLY':
				return getBufferedWeeks(buffer);
			case 'DAILY':
				return getBufferedDays(buffer);
			default:
				return [];
		}
	};

	return (
		<>
			<Autocomplete
				options={getOptions(props.template.frequency, props.template.buffer)}
				sx={{width: 180}}
				value={props.version}
				onChange={(e, version) => {
					props.setVersion(version);
				}}
				renderInput={(params) => <TextField {...params} label="Version" />}
			/>
		</>
	);
};

export default connect(
	({fileImportState}, ownProps) => {
		return {
			buffer: ownProps.buffer,
			freq: ownProps.freq,
			version: fileImportState.version,
			template: fileImportState.template
		};
	},
	(dispatch) => {
		return {
			setVersion: (version) => dispatch(setVersion(version))
		};
	}
)(TemplateVersion);
