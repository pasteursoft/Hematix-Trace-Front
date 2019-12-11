/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */
import { MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_START,
    MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_DESTROY } from '../../consts/actionTypes';

export const MeasurementsDataBulk = payload => ({
    type: MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_START,
    payload
});

export const MeasurementsDataBulkRestart = () => ({
    type: MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_DESTROY
});

