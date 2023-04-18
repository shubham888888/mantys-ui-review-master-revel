import {log} from 'loglevel';
import {all, put, select, takeLatest} from 'redux-saga/effects';
import {SAVE_DATA} from '../actions/actionConstants';
import {setPlanningData} from '../actions/planningActions';

const getRandom = (min, max) => Math.floor(Math.random() * (max - min)) + min;

function* updateData(action) {
	try {
		const editableParams = yield select((state) => state.planningState.editableParams);
		let data = yield select((state) => state.planningState.data);
		data.forEach((dataItem) => {
			for (let key in dataItem) {
				let value = dataItem[key];
				if (!isNaN(value)) {
					let newValue = 0;
					for (let k in editableParams) {
						newValue += getRandom(10, 99) * editableParams[k];
					}
					dataItem[key] = newValue;
				}
			}
		});

		yield put(setPlanningData(data));
	} catch (e) {
		log.error(e);
	}
}

export default function* planningSaga() {
	yield all([yield takeLatest(SAVE_DATA, updateData)]);
}
