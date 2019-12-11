/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */
import {LASTDEVICESSTATUS_BULK_START} from '../../consts/actionTypes';

export const LastDeviceStatusBulkData = payload => ({
    type: LASTDEVICESSTATUS_BULK_START,
    payload
}); 