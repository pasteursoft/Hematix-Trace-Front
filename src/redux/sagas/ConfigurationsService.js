/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */
import { put, call, takeLatest } from 'redux-saga/effects';
import { CONFIGURATIONS_GET_SEARCH_START,
		 CONFIGURATIONS_GET_SEARCH_ERROR,
		 CONFIGURATIONS_GET_SEARCH_COMPLETE,
		 CONFIGURATIONS_GET_BY_MAC_START,
		 CONFIGURATIONS_GET_BY_MAC_ERROR,
		 CONFIGURATIONS_GET_BY_MAC_COMPLETE,
		 CONFIGURATIONS_POST_NEW_START,
         CONFIGURATIONS_POST_NEW_ERROR,
         CONFIGURATIONS_POST_NEW_COMPLETE,
         CONFIGURATIONS_PUT_UPDATE_START,
         CONFIGURATIONS_PUT_UPDATE_ERROR,
         CONFIGURATIONS_PUT_UPDATE_COMPLETE,
         CONFIGURATIONS_DELETE_BY_MAC_START,
         CONFIGURATIONS_DELETE_BY_MAC_ERROR,
         CONFIGURATIONS_DELETE_BY_MAC_COMPLETE
	} from '../../consts/actionTypes';
import QueryString from 'query-string';
import { apiCall } from '../api';

/*
Estrucutra: 
const payload = {
		// 	uriParameters: {
		// 		macAddress: "AA-BB-CC-DD-EE-FF",
		// 		containerName: "Nuevo contenedor 4"
		// 	},
		// 	queryParams: {
		// 		macAddress: "null"
		// 		containerName: "Prototipo"
		// 		page: null,
		// 		pagination: 1
		// 	},
		// 	data: {
		// 		id: "6a67e708-1eff-3f47-baf7-9eeb6e8f98d9",
		// 		macAddress: "AA-BB-CC-DD-EE-FF",
		// 		temperatureCycle: 2,
		// 		gpsCycle: 2,
		// 		gpsTimeout: 2,
		// 		wiFiCycle: 2,
		// 		wiFiTimeout: 2,
		// 		paymentStatus: 2,
		// 		containerName: "Nuevo contenedor 4",
		// 		lastCalibrationDate: "2018-01-01"
		// 	}
 */

export function* searchConfigurationDevices({payload}) {
	const queryParams = QueryString.stringify(payload.queryParams);
	const baseUrl = process.env.REACT_APP_SEARCH_CONFIGURATION_DEVICES + "?";
 	try {
  		const results = yield call(apiCall, baseUrl, queryParams, null, null, 'GET');
 		yield put({type: CONFIGURATIONS_GET_SEARCH_COMPLETE, results})
 	} catch (error) {
  		yield put({type: CONFIGURATIONS_GET_SEARCH_ERROR, error})
  	}
}

export function* searchConfigurationDevice({payload}) {
	const baseUrl = process.env.REACT_APP_CONFIGURATION_DEVICE;
	const uriParams = (payload.uriParameters.macAddress !== undefined) ? "/" + payload.uriParameters.macAddress : null;
 	try {
  		const results = yield call(apiCall, baseUrl, uriParams, null, null, 'GET');
 		yield put({type: CONFIGURATIONS_GET_BY_MAC_COMPLETE, results})
 	} catch (error) {
  		yield put({type: CONFIGURATIONS_GET_BY_MAC_ERROR, error})
  	}
}

export function* createConfigurationDevice({payload}) {
	const baseUrl = process.env.REACT_APP_CREATE_CONFIGURATION_DEVICE
 	try {
  		const results = yield call(apiCall, baseUrl, null, payload.data, null, 'POST');
 		yield put({type: CONFIGURATIONS_POST_NEW_COMPLETE, results})
 	} catch (error) {
  		yield put({type: CONFIGURATIONS_POST_NEW_ERROR, error})
  	}
}

export function* updateConfigurationDevice({payload}) {
	const baseUrl = process.env.REACT_APP_UPDATE_CONFIGURATION_DEVICE;
	const uriParams = (payload.uriParameters.macAddress !== undefined) ? "/" + payload.uriParameters.macAddress : null;
 	try {
  		const results = yield call(apiCall, baseUrl, uriParams, payload.data, null, 'PUT');
 		yield put({type: CONFIGURATIONS_PUT_UPDATE_COMPLETE, results})
 	} catch (error) {
  		yield put({type: CONFIGURATIONS_PUT_UPDATE_ERROR, error})
  	}
}

export function* deleteConfigurationDevice({payload}) {
	const baseUrl = process.env.REACT_APP_DELETE_CONFIGURATION_DEVICE;
	const uriParams = (payload.uriParameters.macAddress !== undefined && payload.uriParameters.id !== undefined) ? 
						"/" + payload.uriParameters.macAddress + "/" + payload.uriParameters.id : null;
 	try {
  		const results = yield call(apiCall, baseUrl, uriParams, null, null, 'DELETE');
 		yield put({type: CONFIGURATIONS_DELETE_BY_MAC_COMPLETE, results})
 	} catch (error) {
  		yield put({type: CONFIGURATIONS_DELETE_BY_MAC_ERROR, error})
  	}
}

export default function* ConfigurationsService() {
	yield takeLatest(CONFIGURATIONS_GET_SEARCH_START, searchConfigurationDevices);
	yield takeLatest(CONFIGURATIONS_GET_BY_MAC_START, searchConfigurationDevice);
	yield takeLatest(CONFIGURATIONS_POST_NEW_START, createConfigurationDevice);
	yield takeLatest(CONFIGURATIONS_PUT_UPDATE_START, updateConfigurationDevice);
	yield takeLatest(CONFIGURATIONS_DELETE_BY_MAC_START, deleteConfigurationDevice);
}

