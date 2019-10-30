/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */
import { get } from 'lodash';
import {MEASUREMENT_GET_MEASUREMENTSDATA_START,
		MEASUREMENT_GET_MEASUREMENTSDATA_ERROR,
        MEASUREMENT_GET_MEASUREMENTSDATA_COMPLETE} from '../../consts/actionTypes';
        
const initialState = {}; 

export default function (state = initialState, actions) {
    switch (actions.type) {
        case MEASUREMENT_GET_MEASUREMENTSDATA_START:
            return {...state, isLoading: true};
        case MEASUREMENT_GET_MEASUREMENTSDATA_COMPLETE:
            console.log(actions.results.data.count);
            return {...state, isLoading: false, MeasurementsResults: actions.results.data};
        case MEASUREMENT_GET_MEASUREMENTSDATA_ERROR:
            return {...state, isLoading: false, MeasurementsResults: null};
        default: 
            return {...state, isLoading: false};
    }
}