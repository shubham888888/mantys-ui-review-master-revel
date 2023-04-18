import {Typography} from '@mui/material';
import React from 'react';
import Plot from 'react-plotly.js';
import styled from 'styled-components';

const CustomChartWrapper = styled.div`
	display: flex;
	padding: 0.7rem 1rem;
	flex-direction: column;
	height: 100%;
	width: 100%;
`;
const StyledLabel = styled(Typography)`
	font-size: 1rem !important;
	font-weight: 600 !important;
`;

const CustomChartContainer = styled.div`
	flex-grow: 1;
	display: flex;
	align-items: center;
`;

const getChart = (component) => {
	switch (component.type) {
		case 'pie-chart':
			return <Plot data={component.value} />;
		case 'doughnut':
			return <Plot data={component.value} />;
		case 'area-chart':
			return <Plot data={component.value} />;
		case 'line-chart':
			return <Plot data={component.value} />;
		case 'graph':
			return <Plot data={component.value} />;
		case 'funnel':
			return <Plot data={component.value} />;
		default:
			return '';
	}
};

const PlotlyCharts = ({component}) => {
	return (
		<CustomChartWrapper>
			<StyledLabel>{component.label}</StyledLabel>
			<CustomChartContainer>{getChart({...component})}</CustomChartContainer>
		</CustomChartWrapper>
	);
};

export default PlotlyCharts;
