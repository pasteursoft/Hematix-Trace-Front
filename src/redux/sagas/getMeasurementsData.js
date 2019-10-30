/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */
import { put, call, takeLatest } from 'redux-saga/effects';
import {MEASUREMENT_GET_MEASUREMENTSDATA_START,
		MEASUREMENT_GET_MEASUREMENTSDATA_ERROR,
		MEASUREMENT_GET_MEASUREMENTSDATA_COMPLETE} from '../../consts/actionTypes';

import { apiCall } from '../api';

export function* getMeasurementDataByMAC({payload}) {
	try {
		console.log(payload.mac);
		const results = yield call(apiCall, payload.mac, null, null, 'GET');
		yield put({type: MEASUREMENT_GET_MEASUREMENTSDATA_COMPLETE, results})
	} catch (error) {
		yield put({type: MEASUREMENT_GET_MEASUREMENTSDATA_ERROR, error})
	}
}

export default function* getMeasurementData() {
	yield takeLatest(MEASUREMENT_GET_MEASUREMENTSDATA_START, getMeasurementDataByMAC);
}