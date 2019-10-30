/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */
import { all } from 'redux-saga/effects';
import getMeasurementData from './getMeasurementsData';

export default function* rootSaga() {
	yield all([
		getMeasurementData()
	]);
}