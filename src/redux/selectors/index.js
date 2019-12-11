import  { get } from 'lodash';

/***********************************************************************************************************************
 *                                           MeasurementService                                                        *
 **********************************************************************************************************************/
// MeasurementsService
export const isMeasurementDataLoading = state => get(state, 'MeasurementsService.isLoading');
export const measurementsResult = state => get(state, 'MeasurementsService.measurementsResults');
export const measurementsError = state => get(state, 'MeasurementsService.error');
export const measurementsResponse= state => get(state, 'MeasurementsService.responseStatus');

/***********************************************************************************************************************
 *                                           MeasurementServiceBulk                                                        *
 **********************************************************************************************************************/
// MeasurementsServiceBulk
export const isMeasurementBulkDataLoading = state => get(state, 'MeasurementsServiceBulk.isLoading');
export const measurementsBulkResult = state => get(state, 'MeasurementsServiceBulk.measurementsResults');
export const measurementsBulkError = state => get(state, 'MeasurementsServiceBulk.error');
export const measurementsBulkResponse= state => get(state, 'MeasurementsServiceBulk.responseStatus');

/***********************************************************************************************************************
 *                                           ConfigurationsDevices                                                     *
 **********************************************************************************************************************/
// ConfigurationsService
 export const isConfigurationsLoading = state => get(state, 'ConfigurationsService.isLoading');
 export const configurationsResult = state => get(state, 'ConfigurationsService.configurationDevicesResults');
 export const configurationsError = state => get(state, 'ConfigurationsService.error');
 export const configurationsResponse = state => get(state, 'ConfigurationsService.responseStatus');

/***********************************************************************************************************************
*                                            LastDeviceStatusBulk                                                      *
***********************************************************************************************************************/
// ConfigurationsService
export const isLastDeviceStatusBulkLoading = state => get(state, 'LastDeviceStatusBulk.isLoading');
export const lastDeviceStatusBulkResult = state => get(state, 'LastDeviceStatusBulk.lastDevicesStatusResult');
export const lastDeviceStatusBulkError = state => get(state, 'LastDeviceStatusBulk.error');
export const lastDeviceStatusBulkResponse = state => get(state, 'LastDeviceStatusBulk.responseStatus');