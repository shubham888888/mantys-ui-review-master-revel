import {SAVE_DATA, SET_EDITABLE_PARAMS, SET_PLANNING_DATA} from './actionConstants';

export const setEditableParams = (name, value) => {
	return {
		type: SET_EDITABLE_PARAMS,
		payload: {name, value}
	};
};

export const saveData = () => {
	return {
		type: SAVE_DATA
	};
};

export const setPlanningData = (data) => {
	return {
		type: SET_PLANNING_DATA,
		payload: {data}
	};
};
