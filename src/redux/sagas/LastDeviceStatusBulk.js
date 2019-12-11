/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */
import { put, call, takeLatest } from 'redux-saga/effects';
import { LASTDEVICESSTATUS_BULK_START,
         LASTDEVICESSTATUS_BULK_ERROR,
		 LASTDEVICESSTATUS_BULK_COMPLETE } from '../../consts/actionTypes';
import QueryString from 'query-string';
import { apiCall } from '../api';

/*
Estrucutra: 
MeasurementsData
const payload = {
	queryParams: {
		page: 0,
		pagination: 60,
	}
}
 */
export function* LastDeviceStatusBulkData({payload}) {
	const queryParams = QueryString.stringify(payload.queryParams);
	const baseUrlConfiguration = process.env.REACT_APP_SEARCH_CONFIGURATION_DEVICES + "?";
	const configurationAll = {
		configurationResults : {
			data: {},
			status: {}
		},
		resultsBulk: []
	};
	const baseUrlLastDeviceStatus = process.env.REACT_APP_MEASUREMENTS_LAST_DEVICE_SATAUS + '/';
	try {
		const configurationResultsResponse = yield call(apiCall, baseUrlConfiguration, queryParams, null, null, 'GET');
		configurationAll.configurationResults.data = configurationResultsResponse.data;
		configurationAll.configurationResults.status = configurationResultsResponse.status;
		for (var result of configurationResultsResponse.data.results) {
			try {
				const lastStatusPartial = yield call(apiCall, baseUrlLastDeviceStatus, result.macAddress, null, null, 'GET');
				const statusDevice = {
					id: result.id,
					macAddress: result.macAddress,
					containerName:  result.containerName,
					lastStatus: lastStatusPartial.data.results
				};
				configurationAll.resultsBulk.push(statusDevice);
			} catch (error) {
				yield put({type: LASTDEVICESSTATUS_BULK_ERROR, error});
			}
		}
        yield put({type: LASTDEVICESSTATUS_BULK_COMPLETE, configurationAll});
   	} catch (error) {
		yield put({type: LASTDEVICESSTATUS_BULK_ERROR, error});
	}
}  

export default function* LastDeviceStatusBulk() {
	yield takeLatest(LASTDEVICESSTATUS_BULK_START, LastDeviceStatusBulkData);
}
