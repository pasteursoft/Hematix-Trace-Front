# MedicoSoft (c) 2019
# Made under Proprietary license
# Docker image for Node on Debian 10
FROM node:12.10.0-alpine AS build

WORKDIR /app

COPY package.json /app/package.json

ENV PATH /app/node_modules/.bin:$PATH 

ENV TRACE_ALERT_TEMP_MAX=10 \
    TRACE_ALERT_TEMP_MIN=2 \
    TRACE_ENDPOINT_CONFIGURATION_URL_BASE=http://medicosoft.mx:2053 \
    TRACE_ENDPOINT_MEASUREMENTS_URL_BASE=http://medicosoft.mx:2052 \
    TRACE_GOOGLE_API_KEY=AIzaSyBgq1CzLtAXz1zsIM_MZIa6pYzpA5XSWiM \
    TRACE_GOOGLE_API_URL_BASE=https://maps.googleapis.com/maps/api/js?key= 

ENV TRACE_CONFIGURATION_CREATE=${TRACE_ENDPOINT_CONFIGURATION_URL_BAS}/api/devicesConfiguration/configuration \
    TRACE_CONFIGURATION_DELETE=${TRACE_ENDPOINT_CONFIGURATION_URL_BAS}/api/devicesConfiguration/configuration \
    TRACE_CONFIGURATION_DEVICECONFIGURATION=${TRACE_ENDPOINT_CONFIGURATION_URL_BASE}/api/devicesConfiguration/deviceConfiguration \
    TRACE_CONFIGURATION_SEARCH=${TRACE_ENDPOINT_CONFIGURATION_URL_BASE}/api/devicesConfiguration/search \
    TRACE_CONFIGURATION_UPDATE=${TRACE_ENDPOINT_CONFIGURATION_URL_BASE}/api/devicesConfiguration/configuration \
    TRACE_MEASUREMENTS_DEVICE_DATA=${TRACE_ENDPOINT_MEASUREMENTS_URL_BASE}/api/Measurements/MeasurementsData \
    TRACE_MEASUREMENTS_LAST_DEVICE_SATAUS=${TRACE_ENDPOINT_MEASUREMENTS_URL_BASE}/api/Measurements/LastDeviceStatus

RUN npm install --silent
RUN npm install react-scripts@3.2.0 -g --silent
RUN npm install dotenv -g --silent

EXPOSE 3000

COPY . /app

RUN npm run build
#CMD ["npm", "start"]

# production environment
FROM nginx:1.16.1-alpine

ENV TRACE_ALERT_TEMP_MAX=10 \
    TRACE_ALERT_TEMP_MIN=2 \
    TRACE_ENDPOINT_CONFIGURATION_URL_BASE=http://medicosoft.mx:2053 \
    TRACE_ENDPOINT_MEASUREMENTS_URL_BASE=http://medicosoft.mx:2052 \
    TRACE_GOOGLE_API_KEY=AIzaSyBgq1CzLtAXz1zsIM_MZIa6pYzpA5XSWiM \
    TRACE_GOOGLE_API_URL_BASE=https://maps.googleapis.com/maps/api/js?key= 

ENV TRACE_CONFIGURATION_CREATE=${TRACE_ENDPOINT_CONFIGURATION_URL_BAS}/api/devicesConfiguration/configuration \
    TRACE_CONFIGURATION_DELETE=${TRACE_ENDPOINT_CONFIGURATION_URL_BAS}/api/devicesConfiguration/configuration \
    TRACE_CONFIGURATION_DEVICECONFIGURATION=${TRACE_ENDPOINT_CONFIGURATION_URL_BASE}/api/devicesConfiguration/deviceConfiguration \
    TRACE_CONFIGURATION_SEARCH=${TRACE_ENDPOINT_CONFIGURATION_URL_BASE}/api/devicesConfiguration/search \
    TRACE_CONFIGURATION_UPDATE=${TRACE_ENDPOINT_CONFIGURATION_URL_BASE}/api/devicesConfiguration/configuration \
    TRACE_MEASUREMENTS_DEVICE_DATA=${TRACE_ENDPOINT_MEASUREMENTS_URL_BASE}/api/Measurements/MeasurementsData \
    TRACE_MEASUREMENTS_LAST_DEVICE_SATAUS=${TRACE_ENDPOINT_MEASUREMENTS_URL_BASE}/api/Measurements/LastDeviceStatus

COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]