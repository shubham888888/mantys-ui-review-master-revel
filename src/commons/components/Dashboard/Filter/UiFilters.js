import {InputLabel, MenuItem} from '@mui/material';
import {isEmpty, isNil} from 'lodash';
import React from 'react';
import {getRange} from '../../../utils/viewsUtils';
import {
	FiltersWrapper,
	PointInTimeToggle,
	StyledButton,
	StyledFormControl,
	StyledSelect,
	StyledToggleButton,
	Wrapper
} from './FiltersStyles';

/**
 *
 * @param {*object} filter
 * @returns an array of objects for rendering filters on the ui
 * @author haider@mantys.io
 */
const getAllowedValues = (filter) => {
	switch (filter.filterType) {
		case 'number':
			return getRange(filter.min, filter.max);
		default:
			if (isEmpty(filter.allowedValues)) {
				return [];
			}
			return filter.allowedValues.map((item, idx) => {
				return { id: idx, value: item };
			});
	}
};

const UiFilters = (props) => {
	const isFiltersEmpty = isEmpty(props.filters);
	if (props.filters !== null) {
		const filtered = props.filters.filter((filter) => filter.filterName === 'Month');
		if (!isEmpty(filtered) && filtered[0].value === 'Custom') {
			if (props.filters.filter((filter) => filter.filterName === 'Custom month').length > 0) {
				// make custom month and custom year filter visible
				props.filters.filter((filter) => filter.filterName === 'Custom month')[0].hidden = false;
				props.filters.filter((filter) => filter.filterName === 'Custom year')[0].hidden = false;
			}
		}
	}
	return (
		<Wrapper>
			{!isFiltersEmpty && (
				<FiltersWrapper inlineMargin={props.inlineMargin}>
					{props.filters.map((filter) => {
						return (
							<span key={filter.filterId}>
								{filter.hidden !== true && (
									<StyledFormControl key={filter.filterId} size="small" raised={props.raised}>
										<InputLabel
											sx={{ border: 'none !important', outline: 'none !important' }}
											id="demo-select-small"
										>
											{filter.filterName}
										</InputLabel>
										<StyledSelect
											labelId="demo-select-small"
											id="demo-select-small"
											value={isEmpty(filter.value) ? '' : filter.value}
											sx={{width: 150}}
											label={filter.filterName}
											disabled={filter.disabled}
											onChange={(e) => {
												if (
													props.filters.filter(
														(filter) => filter.filterName === 'Custom month'
													).length > 0
												) {
													if (filter.filterName === 'Month' && e.target.value === 'Custom') {
														// make custom month and custom year filter visible
														props.filters.filter(
															(filter) => filter.filterName === 'Custom month'
														)[0].hidden = false;
														props.filters.filter(
															(filter) => filter.filterName === 'Custom year'
														)[0].hidden = false;
													} else if (filter.filterName === 'Month') {
														// make custom month and custom year filter visible
														props.filters.filter(
															(filter) => filter.filterName === 'Custom month'
														)[0].hidden = true;
														props.filters.filter(
															(filter) => filter.filterName === 'Custom year'
														)[0].hidden = true;
													}
												}

												if (
													filter.filterName === 'Custom month' ||
													filter.filterName === 'Custom year'
												) {
													let months = [
														'jan',
														'feb',
														'mar',
														'apr',
														'may',
														'jun',
														'jul',
														'aug',
														'sep',
														'oct',
														'nov',
														'dec'
													];
													let year = filter.filterName === 'Custom year' ? +e.target.value : +props.filters.filter(
														(filter) => filter.filterName === 'Custom year'
													)[0].value;
													let month = months.indexOf(filter.filterName === 'Custom month' ? e.target.value.toLowerCase() : props.filters.filter((filter) => filter.filterName === 'Custom month')[0].value.toLowerCase());
													let lastDayInMonth = new Date(year, month + 1, 0).getDate();
													props.filters
														.filter((filter) => filter.filterName === 'Month')[0]
														.valueToStartEndDates.Custom.startDate = '' + year + (month < 9 ? ('0' + (month + 1)) : (month + 1)) + '01';

													props.filters.filter(
														(filter) => filter.filterName === 'Month'
													)[0].valueToStartEndDates.Custom.endDate =
														'' +
														year +
														(month < 9 ? ('0' + (month + 1)) : (month + 1)) +
														lastDayInMonth;
												}
												props.updateFilterValue(props.filters, filter.filterId, e.target.value);
											}}
										>
											{isNil(filter.defaultValue) && (
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
											)}
											{getAllowedValues(filter).map((allowedValue) => {
												return (
													<MenuItem key={allowedValue.id} value={allowedValue.value}>
														{allowedValue.value}
													</MenuItem>
												);
											})}
										</StyledSelect>
									</StyledFormControl>
								)}
							</span>
						);
					})}
					{!isFiltersEmpty && !props.hideApplyButton && (
						<StyledButton
							variant="contained"
							onClick={() => {
								if (isNil(props.applyFilters) || isNil(props.filters)) return;
								props.applyFilters(props.filters);
							}}
						>
							Apply
						</StyledButton>
					)}
				</FiltersWrapper>
			)}

			{!isFiltersEmpty && !props.hidePointInTime && (
				<PointInTimeToggle>
					<StyledToggleButton
						ischecked={props.pointInTimeStatus ? 'true' : 'false'}
						variant={props.pointInTimeStatus ? 'contained' : 'outlined'}
						sx={{marginRight: 5}}
						onClick={() => {
							props.setPointInTimeToggle(!props.pointInTimeStatus);
						}}
						value="Point In Time Status"
					>
						View point in time
					</StyledToggleButton>
				</PointInTimeToggle>
			)}
		</Wrapper>
	);
};

export default UiFilters;
