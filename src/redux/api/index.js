/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */
import axios from 'axios';

const baseUrlMeasurementService = 'http://medicosoft.com.mx:2052/api/Measurements/MeasurementsData/';

export const apiCall = (url, data, headers, method) => axios({
    method,
    url: baseUrlMeasurementService + url,
    headers,
    data
});

