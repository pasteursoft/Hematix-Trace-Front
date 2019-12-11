/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */
import {MEASUREMENTS_GET_MEASUREMENTSDATA_START,
		MEASUREMENTS_GET_MEASUREMENTSDATA_ERROR,
        MEASUREMENTS_GET_MEASUREMENTSDATA_COMPLETE,
        MEASUREMENTS_GET_LASTDEVICESTATUS_START,
        MEASUREMENTS_GET_LASTDEVICESTATUS_ERROR,
        MEASUREMENTS_GET_LASTDEVICESTATUS_COMPLETE
    } from '../../consts/actionTypes';
        
const initialState = {}; 

export default function (state = initialState, actions) {
    switch (actions.type) {
        case MEASUREMENTS_GET_MEASUREMENTSDATA_START:
            return {...state, isLoading: true};
        case MEASUREMENTS_GET_MEASUREMENTSDATA_COMPLETE:
            return {...state, isLoading: false, measurementsResults: actions.results.data, responseStatus: actions.results.status};
        case MEASUREMENTS_GET_MEASUREMENTSDATA_ERROR:
            return {...state, isLoading: false, measurementsResults: null, error: actions, responseStatus: actions.error.response.status};
        case MEASUREMENTS_GET_LASTDEVICESTATUS_START:
            return {...state, isLoading: true};
        case MEASUREMENTS_GET_LASTDEVICESTATUS_COMPLETE:
            return {...state, isLoading: false, measurementsResults: actions.results.data, responseStatus: actions.results.status};
        case MEASUREMENTS_GET_LASTDEVICESTATUS_ERROR:
            return {...state, isLoading: false, measurementsResults: null, error: actions, responseStatus: actions.error.response.status};
        default: 
            return {...state, isLoading: false};
    }
}