/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */
import {MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_START,
		MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_ERROR,
        MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_COMPLETE,
        MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_DESTROY
    } from '../../consts/actionTypes';
        
const initialState = {}; 

export default function (state = initialState, actions) {
    switch (actions.type) {
        case MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_DESTROY:
            state = undefined;
            return {state};
        case MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_START:
            return {...state, isLoading: true};
        case MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_COMPLETE:
            return {...state, isLoading: false, measurementsResults: actions.results, responseStatus: actions.results};
        case MEASUREMENTS_GET_MEASUREMENTSDATA_BULK_ERROR:
            return {...state, isLoading: false, measurementsResults: null, error: actions, responseStatus: actions.error};
        default: 
            return {...state, isLoading: false};
    }
}