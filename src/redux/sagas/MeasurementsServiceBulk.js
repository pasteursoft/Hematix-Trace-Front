/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */
import { put, call, takeLatest, takeEvery } from 'redux-saga/effects';
import {MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_START,
		MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_ERROR,
		MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_COMPLETE
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
export function* MeasurementsBulkData({payload}) {
	let queryParams = QueryString.stringify(payload.queryParams);
	let uriParams = (payload.uriParameters.macAddress !== undefined) ? "/" + payload.uriParameters.macAddress : "/";
	let params = uriParams + '?' + queryParams;
	const baseUrl = process.env.REACT_APP_MEASUREMENTS_DEVICE_DATA;
	try {
		const results = [];
		let resultsIntermediate = yield call(apiCall, baseUrl, params, null, null, 'GET');
		results.push(resultsIntermediate);
		while (resultsIntermediate.data.next !== null) {
			payload.queryParams.page++;
			queryParams = QueryString.stringify(payload.queryParams);
			uriParams = (payload.uriParameters.macAddress !== undefined) ? "/" + payload.uriParameters.macAddress : "/";
			params = uriParams + '?' + queryParams;
			resultsIntermediate = yield call(apiCall, baseUrl, params, null, null, 'GET');
			results.push(resultsIntermediate);
		}
		yield put({type: MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_COMPLETE, results})
	} catch (error) {
		yield put({type: MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_ERROR, error})
	}
}

export default function* MeasurementsServiceBulk() {
	yield takeEvery(MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_START, MeasurementsBulkData);
}


