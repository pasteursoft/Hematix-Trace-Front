/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */
import { all, take } from 'redux-saga/effects';
import MeasurementsService from './MeasurementsService';
import ConfigurationsService from './ConfigurationsService';
import LastDeviceStatusBulk from './LastDeviceStatusBulk';
import MeasurementsServiceBulk from './MeasurementsServiceBulk';


export default function* rootSaga() {
	yield all([
		ConfigurationsService(),
		MeasurementsService(),
		LastDeviceStatusBulk(),
		MeasurementsServiceBulk(),
	]);
}