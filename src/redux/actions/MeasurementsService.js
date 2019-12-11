/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */
import { MEASUREMENTS_GET_MEASUREMENTSDATA_START,
         MEASUREMENTS_GET_LASTDEVICESTATUS_START } from '../../consts/actionTypes';

export const MeasurementsData = payload => ({
    type: MEASUREMENTS_GET_MEASUREMENTSDATA_START,
    payload
});

export const LastDeviceStatus = payload => ({
    type: MEASUREMENTS_GET_LASTDEVICESTATUS_START,
    payload
});