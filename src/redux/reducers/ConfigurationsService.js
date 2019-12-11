/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */
import { CONFIGURATIONS_GET_SEARCH_START,
         CONFIGURATIONS_GET_SEARCH_ERROR,
         CONFIGURATIONS_GET_SEARCH_COMPLETE,
         CONFIGURATIONS_GET_BY_MAC_START,
		 CONFIGURATIONS_GET_BY_MAC_ERROR,
         CONFIGURATIONS_GET_BY_MAC_COMPLETE,
         CONFIGURATIONS_POST_NEW_START,
         CONFIGURATIONS_POST_NEW_ERROR,
         CONFIGURATIONS_POST_NEW_COMPLETE,
         CONFIGURATIONS_PUT_UPDATE_START,
         CONFIGURATIONS_PUT_UPDATE_ERROR,
         CONFIGURATIONS_PUT_UPDATE_COMPLETE,
         CONFIGURATIONS_DELETE_BY_MAC_START,
         CONFIGURATIONS_DELETE_BY_MAC_ERROR,
         CONFIGURATIONS_DELETE_BY_MAC_COMPLETE
        } from '../../consts/actionTypes';
    
const initialState = {}; 

export default function (state = initialState, actions) {
switch (actions.type) {
    case CONFIGURATIONS_GET_SEARCH_START:
        return {...state, isLoading: true};
    case CONFIGURATIONS_GET_SEARCH_COMPLETE:
        return {...state, isLoading: false, configurationDevicesResults: actions.results.data, responseStatus: actions.results.status};
    case CONFIGURATIONS_GET_SEARCH_ERROR:
        return {...state, isLoading: false, configurationDevicesResults: null, error: actions, responseStatus: actions.error.response.status};
    case CONFIGURATIONS_GET_BY_MAC_START:
        return {...state, isLoading: true};
    case CONFIGURATIONS_GET_BY_MAC_COMPLETE:
        return {...state, isLoading: false, configurationDevicesResults: actions.results.data, responseStatus: actions.results.status};
    case CONFIGURATIONS_GET_BY_MAC_ERROR:
        return {...state, isLoading: false, configurationDevicesResults: null, error: actions, responseStatus: actions.error.response.status};
    case CONFIGURATIONS_POST_NEW_START:
        return {...state, isLoading: true};
    case CONFIGURATIONS_POST_NEW_COMPLETE:
        return {...state, isLoading: false, configurationDevicesResults: actions.results.data, responseStatus: actions.results.status};
    case CONFIGURATIONS_POST_NEW_ERROR:
        return {...state, isLoading: false, configurationDevicesResults: null, error: actions, responseStatus: actions.error.response.status};
    case CONFIGURATIONS_PUT_UPDATE_START:
        return {...state, isLoading: true};
    case CONFIGURATIONS_PUT_UPDATE_COMPLETE:
        return {...state, isLoading: false, configurationDevicesResults: actions.results.data, responseStatus: actions.results.status};
    case CONFIGURATIONS_PUT_UPDATE_ERROR:
        return {...state, isLoading: false, configurationDevicesResults: null, error: actions, responseStatus: actions.error.response.status};
    case CONFIGURATIONS_DELETE_BY_MAC_START:
        return {...state, isLoading: true};
    case CONFIGURATIONS_DELETE_BY_MAC_COMPLETE:
        return {...state, isLoading: false, configurationDevicesResults: actions.results.data, responseStatus: actions.results.status};
    case CONFIGURATIONS_DELETE_BY_MAC_ERROR:
        return {...state, isLoading: false, configurationDevicesResults: null, error: actions, responseStatus: actions.error.response.status};
    default: 
        return {...state, isLoading: false};
    }
}