/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */
import { CONFIGURATIONS_GET_SEARCH_START,
    CONFIGURATIONS_GET_BY_MAC_START,
    CONFIGURATIONS_POST_NEW_START,
    CONFIGURATIONS_PUT_UPDATE_START,
    CONFIGURATIONS_DELETE_BY_MAC_START} from '../../consts/actionTypes';

export const SearchConfigurationDevices = payload => ({
    type: CONFIGURATIONS_GET_SEARCH_START,
    payload
}); 

export const SearchConfigurationDevice = payload => ({
    type: CONFIGURATIONS_GET_BY_MAC_START,
    payload 
}); 

export const CreateConfigurationDevice = payload => ({
    type: CONFIGURATIONS_POST_NEW_START,
    payload 
}); 

export const UpdateConfigurationDevice = payload => ({
    type: CONFIGURATIONS_PUT_UPDATE_START,
    payload 
}); 

export const DeleteConfigurationDevice = payload => ({
    type: CONFIGURATIONS_DELETE_BY_MAC_START,
    payload 
}); 