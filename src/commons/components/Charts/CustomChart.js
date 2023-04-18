import {Typography} from '@mui/material';
import {Chart as ChartJS, registerables} from 'chart.js';
import {isEmpty} from 'lodash';
import React from 'react';
import {Bar, Doughnut, Line, Pie} from 'react-chartjs-2';
import {FunnelChart} from 'react-funnel-pipeline';
import 'react-funnel-pipeline/dist/index.css';
import Plot from 'react-plotly.js';
import styled from 'styled-components';
import {COLORS} from '../../styles/theme';
import {nFormatter} from '../../utils/commonUtils';

ChartJS.register(...registerables);

const options = {
	plugins: {
		legend: {
			position: 'bottom'
		}
	}
};

const graphOptions = {
	// responsive: true,
	plugins: {
		legend: {
			position: 'bottom',
			fullSize: true,
			labels: {
				padding: 20
			}
		}
	},
	scales: {
		x: {
			grid: {
				display: false
			}
		},
		y: {
			grid: {
				display: false
			},
			ticks: {
				callback: function (label, index, labels) {
					return nFormatter(label, 0);
				}
			}
		}
	}
};

const areaChartOptions = {
	plugins: {
		legend: {
			position: 'top',
			title: {
				display: true,
				marginBottom: 20
			}
		}
	},
	elements: {
		line: {
			fill: '-1'
		}
	},
	scales: {
		x: {
			display: true,
			grid: {
				display: false
			}
		},
		y: {
			stacked: true,
			display: true,
			grid: {
				display: false
			},
			ticks: {
				callback: function (label, index, labels) {
					return nFormatter(label, 0);
				}
			}
		}
	}
};

export const lineGraphOptions = {
	plugins: {
		legend: {
			position: 'top',
			title: {
				display: true,
				marginBottom: 20
			}
		}
	},
	scales: {
		x: {
			display: true,
			grid: {
				display: false
			}
		},
		y: {
			display: true,
			stacked: true,
			grid: {
				display: false
			},
			ticks: {
				callback: function (label, index, labels) {
					return nFormatter(label, 0);
				}
			}
		}
	}
};

const CustomChartWrapper = styled.div`
	display: flex;
	padding: 0.7rem 1rem;
	flex-direction: column;
	height: 100%;
	width: 100%;
`;
const StyledLabel = styled(Typography)`
	font-size: 1rem !important;
	color: ${COLORS.GREY_BLACK};
`;

const CustomChartContainer = styled.div`
	flex-grow: 1;
	display: flex;
	align-items: center;
`;

const getChart = (component) => {
	if (isEmpty(component?.value)) {
		return null;
	}
	switch (component.type) {
		case 'pie-chart':
			return <Pie style={{objectFit: 'contain'}} options={options} data={component.value} />;
		case 'doughnut':
			return <Doughnut options={{...options, aspectRatio: component.aspectRatio}} data={component.value} />;
		case 'area-chart':
			return <Line options={areaChartOptions} data={component.value} />;
		case 'line-graph':
			return <Line options={lineGraphOptions} data={component.value} />;
		case 'graph':
			return <Bar options={graphOptions} data={component.value} />;
		case 'funnel':
			return (
				<FunnelChart
					style={{flexGrow: 1, color: '#000000 !important'}}
					data={component.value.data}
					pallette={component.value.colorPallete}
					heightRelativeToValue
					showNames={true}
					getRowStyle={() => {
						return {color: '#000000'};
					}}
				/>
			);
		case 'waterfall':
			return (
				<Plot
					data={component.value}
					layout={{xaxis: {showgrid: false, automargin: true}, yaxis: {showgrid: false, automargin: true}}}
					config={{responsive: true}}
				/>
			);
		default:
			return '';
	}
};

const CustomChart = ({component}) => {
	return (
		<CustomChartWrapper>
			<StyledLabel>{component.label}</StyledLabel>
			<CustomChartContainer>{getChart({...component})}</CustomChartContainer>
		</CustomChartWrapper>
	);
};

export default CustomChart;
