import React from 'react';
import {MAX_GRID_WIDTH} from '../../styles/theme';
import {orderDataColumns} from '../../utils/GridUtils';
import BoxMantys from '../Box/Box';
import MantysDataGrid from '../Grid/MantysDataGrid';
import CustomChart from './CustomChart';

const ChartsWrapper = ({dataItem, maxGridCols = 4}) => {
	switch (dataItem.type) {
		case 'grid': {
			const Width = MAX_GRID_WIDTH * (dataItem.layout.position.w / maxGridCols);
			return (
				<MantysDataGrid
					columnGrouping={dataItem.columnGrouping}
					columnsData={dataItem.columns}
					groupedColumns={dataItem.groupedColumns}
					colorGroupOnDifference={dataItem.colorGroupOnDifference}
					clickGroupCells={dataItem.clickGroupCells}
					data={orderDataColumns(dataItem.value, dataItem.columns)}
					gridWidth={Width}
					fileName={dataItem.label}
					dashboardGrid={true}
				/>
			);
		}
		case 'expandable-grid':
			return (
				<MantysDataGrid
					expandable={true}
					data={orderDataColumns(dataItem.value, dataItem.columns)}
					fileName={dataItem.label}
					dashboardGrid={true}
				/>
			);
		case 'box':
			return <BoxMantys value={dataItem.value} label={dataItem.label} />;
		default:
			return <CustomChart component={dataItem} />;
	}
};

export default ChartsWrapper;
