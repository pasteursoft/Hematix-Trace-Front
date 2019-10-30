/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */
import {MEASUREMENT_GET_MEASUREMENTSDATA_START} from '../../consts/actionTypes';

export const getMeasurementsData = payload => ({
    type: MEASUREMENT_GET_MEASUREMENTSDATA_START,
    payload
}); 