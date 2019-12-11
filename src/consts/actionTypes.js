/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */

/***********************************************************************************************************************
 *                                           Measurementes service                                                     *
 **********************************************************************************************************************/
// GET MeasurementsData
export const MEASUREMENTS_GET_MEASUREMENTSDATA_START = "MEASUREMENT_GET_MEASUREMENTSDATA_START";
export const MEASUREMENTS_GET_MEASUREMENTSDATA_ERROR = "MEASUREMENT_GET_MEASUREMENTSDATA_ERROR";
export const MEASUREMENTS_GET_MEASUREMENTSDATA_COMPLETE = "MEASUREMENT_GET_MEASUREMENTSDATA_COMPLETE";

// GET MeasurementsDataBulk
export const MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_START = "MEASUREMENT_GET_MEASUREMENTSDATA_BULK_START";
export const MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_ERROR = "MEASUREMENT_GET_MEASUREMENTSDATA_BULK_ERROR";
export const MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_COMPLETE = "MEASUREMENT_GET_MEASUREMENTSDATA_BULK_COMPLETE";
export const MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_DESTROY = "MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_DESTROY";

// GET LastDeviceStatus
export const MEASUREMENTS_GET_LASTDEVICESTATUS_START = "MEASUREMENT_GET_LASTDEVICESTATUS_START";
export const MEASUREMENTS_GET_LASTDEVICESTATUS_ERROR = "MEASUREMENT_GET_LASTDEVICESTATUS_ERROR";
export const MEASUREMENTS_GET_LASTDEVICESTATUS_COMPLETE = "MEASUREMENT_GET_LASTDEVICESTATUS_COMPLETE";

/***********************************************************************************************************************
 *                                           ConfigurationDevices                                                    *
 **********************************************************************************************************************/
// GET All configurations
 export const CONFIGURATIONS_GET_SEARCH_START = "CONFIGURATIONS_GET_ALL_START";
 export const CONFIGURATIONS_GET_SEARCH_ERROR = "CONFIGURATIONS_GET_ALL_ERROR";
 export const CONFIGURATIONS_GET_SEARCH_COMPLETE = "CONFIGURATIONS_GET_ALL_COMPLETE";

// GET specific configurations
 export const CONFIGURATIONS_GET_BY_MAC_START = "CONFIGURATIONS_GET_BY_MAC_START";
 export const CONFIGURATIONS_GET_BY_MAC_ERROR = "CONFIGURATIONS_GET_BY_MAC_ERROR";
 export const CONFIGURATIONS_GET_BY_MAC_COMPLETE = "CONFIGURATIONS_GET_BY_MAC_COMPLETE";

// POST new configuration
 export const CONFIGURATIONS_POST_NEW_START = "CONFIGURATIONS_POST_NEW_START";
 export const CONFIGURATIONS_POST_NEW_ERROR = "CONFIGURATIONS_POST_NEW_ERROR";
 export const CONFIGURATIONS_POST_NEW_COMPLETE = "CONFIGURATIONS_POST_NEW_COMPLETE";

// PUT update configuration
 export const CONFIGURATIONS_PUT_UPDATE_START = "CONFIGURATIONS_PUT_UPDATE_START";
 export const CONFIGURATIONS_PUT_UPDATE_ERROR = "CONFIGURATIONS_PUT_UPDATE_ERROR";
 export const CONFIGURATIONS_PUT_UPDATE_COMPLETE = "CONFIGURATIONS_PUT_UPDATE_COMPLETE";

// DELETE specific configurations
 export const CONFIGURATIONS_DELETE_BY_MAC_START = "CONFIGURATIONS_DELETE_BY_MAC_START";
 export const CONFIGURATIONS_DELETE_BY_MAC_ERROR = "CONFIGURATIONS_DELETE_BY_MAC_ERROR";
 export const CONFIGURATIONS_DELETE_BY_MAC_COMPLETE = "CONFIGURATIONS_DELETE_BY_MAC_COMPLETE";

 
/***********************************************************************************************************************
 *                                            LastDeviceStatusBulk                                                     *
 **********************************************************************************************************************/
// GET All configurations and last Status
export const LASTDEVICESSTATUS_BULK_START = "LASTDEVICESSTATUS_BULK_START";
export const LASTDEVICESSTATUS_BULK_ERROR = "LASTDEVICESSTATUS_BULK_ERROR";
export const LASTDEVICESSTATUS_BULK_COMPLETE = "LASTDEVICESSTATUS_BULK_COMPLETE";

