/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */
import { put, call, takeLatest } from 'redux-saga/effects';
import {MEASUREMENTS_GET_MEASUREMENTSDATA_START,
		MEASUREMENTS_GET_MEASUREMENTSDATA_ERROR,
		MEASUREMENTS_GET_MEASUREMENTSDATA_COMPLETE,
		MEASUREMENTS_GET_LASTDEVICESTATUS_START,
		MEASUREMENTS_GET_LASTDEVICESTATUS_ERROR,
		MEASUREMENTS_GET_LASTDEVICESTATUS_COMPLETE
	} from '../../consts/actionTypes';
import QueryString from 'query-string';
import { apiCall } from '../api';

/*
Estrucutra: 
MeasurementsData
const payload = {
	uriParameters: {
		macAddress: "AA-BB-CC-DD-EE-FF"
	},
	queryParams: {
		startDate: "2000-01-01T00:00+00:00",
		endDate: "2000-01-01T00:00+00:00",
		page: 0,
		pagination: 60,
	}
}
 */
export function* MeasurementsData({payload}) {
	const queryParams = QueryString.stringify(payload.queryParams);
	const uriParams = (payload.uriParameters.macAddress !== undefined) ? "/" + payload.uriParameters.macAddress : "/";
	const params = uriParams + '?' + queryParams;
	const baseUrl = process.env.REACT_APP_MEASUREMENTS_DEVICE_DATA;
	try {
		const results = yield call(apiCall, baseUrl, params, null, null, 'GET');
		yield put({type: MEASUREMENTS_GET_MEASUREMENTSDATA_COMPLETE, results})
	} catch (error) {
		yield put({type: MEASUREMENTS_GET_MEASUREMENTSDATA_ERROR, error})
	}
}

/*
Estrucutra: 
/*
Estrucutra: 
const payload = {
		// 	queryParams: {
		// 		page: null,
		// 		pagination: 1
		// 	}
 */
export function* LastDeviceStatus({payload}) {
	const uriParams = (payload.uriParameters.macAddress !== undefined) ? "/" + payload.uriParameters.macAddress : "/";
	const baseUrl = process.env.REACT_APP_MEASUREMENTS_LAST_DEVICE_SATAUS;
	try {
		const results = yield call(apiCall, baseUrl, uriParams, null, null, 'GET');
		yield put({type: MEASUREMENTS_GET_LASTDEVICESTATUS_COMPLETE, results})
	} catch (error) {
		yield put({type: MEASUREMENTS_GET_LASTDEVICESTATUS_ERROR, error})
	}
}

/*
Estrucutra: 
MeasurementsData
const payload = {
	uriParameters: {
		macAddress: "AA-BB-CC-DD-EE-FF"
	}
}
 */
export default function* MeasurementsService() {
	yield takeLatest(MEASUREMENTS_GET_MEASUREMENTSDATA_START, MeasurementsData);
	yield takeLatest(MEASUREMENTS_GET_LASTDEVICESTATUS_START, LastDeviceStatus);
}


