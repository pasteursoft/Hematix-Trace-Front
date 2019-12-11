/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */
import axios from 'axios';

// params = queryParams y uriParams
export const apiCall = (baseUrl, params, data, headers, method) => axios({
    method,
    url: (params != null) ? baseUrl + params : baseUrl,
    headers,
    data
});

