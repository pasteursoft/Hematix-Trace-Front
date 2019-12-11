/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */
import { LASTDEVICESSTATUS_BULK_START,
        LASTDEVICESSTATUS_BULK_ERROR,
        LASTDEVICESSTATUS_BULK_COMPLETE
    } from '../../consts/actionTypes';
    
const initialState = {}; 

export default function (state = initialState, actions) {
switch (actions.type) {
    case LASTDEVICESSTATUS_BULK_START:
        return {...state, isLoading: true};
    case LASTDEVICESSTATUS_BULK_COMPLETE:
        return {...state, isLoading: false, lastDevicesStatusResult: actions.configurationAll, responseStatus: actions};
    case LASTDEVICESSTATUS_BULK_ERROR:
        return {...state, isLoading: false, lastDevicesStatusResult: null, error: actions, responseStatus: actions.error.response.status};
    default: 
        return {...state, isLoading: false};
    }
}