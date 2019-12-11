  
import { combineReducers } from 'redux';
import MeasurementsService from './MeasurementsService';
import ConfigurationsService from './ConfigurationsService';
import LastDeviceStatusBulk from './LastDeviceStatusBulk';
import MeasurementsServiceBulk from './MeasurementsServiceBulk';


const rootReducer = combineReducers({
	ConfigurationsService,
	MeasurementsService,
	LastDeviceStatusBulk,
	MeasurementsServiceBulk
});

export default rootReducer;