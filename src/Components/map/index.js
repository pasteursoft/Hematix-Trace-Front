import React, { useState } from "react";
import { MAP_TYPES } from "./mapsEnums";
import MapPolyline from "../mapPolyline";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '../../Components/alert';
import { MESSAGE_TYPE } from '../../Components/alert/messageType';

const googleMapsApiKey = process.env.REACT_APP_API_KEY_GOOGLE;

const googleMapsApiUrlBase = process.env.REACT_APP_API_URL_BASE;

const useStyles = makeStyles(theme => ({
	warning: {
		backgroundColor: "rgba(238, 208, 118, 0.8)",
		color: 'rgb(139, 108, 13)',
		padding: "5px",
		margin: "5px",
		border: "0px",
		boxShadow: 'none',
	},
	warningContent: {
		paddingLeft: '5px',
		paddingRight: '5px',
	}
	}));

export default ({data, type, ...props}) => {
	const classes = useStyles();
	const [dataSet, setDataSet] = useState(data);
	const [typeMap, setTypeMap] = useState((type) ? type : MAP_TYPES.COORDINATES);
	
	const getCoordinatesByType = (typeMaps, dataSets) => {
		switch (typeMaps) { 
			case MAP_TYPES.COORDINATES:
				return getCoordinatesForRoute(dataSets);
			case MAP_TYPES.LAST_STATUS_DEVICE:
				return getCoordinatesForLastStatus(dataSets);
			default:
				return getCoordinatesForRoute(dataSets);
		}
	};

	const getCoordinatesForRoute = (coordinatesArray) => {
		const coordinates = [];
		if (coordinatesArray.count > 0) {
			coordinatesArray.results.map((coordinatesArray) => {
				if (coordinatesArray.latitude !== 0 || coordinatesArray.longitude !== 0)
				coordinates.push({lat: coordinatesArray.latitude, lng: coordinatesArray.longitude});
			});
		}
		return coordinates;
		
	};

	const getCoordinatesForLastStatus = (coordinatesArrayStatus) => {
		const coordinatesLast = [];
		if (coordinatesArrayStatus.geoPositionStatus.latitud !== 0 
			|| coordinatesArrayStatus.geoPositionStatus.longitud !== 0);
			coordinatesLast.push({lat: coordinatesArrayStatus.geoPositionStatus.latitud, 
				lng: coordinatesArrayStatus.geoPositionStatus.longitud});
		return coordinatesLast;
	};

	const rednderMap = (typeMap) => {
		const coodinates = getCoordinatesByType(typeMap, dataSet);
		if ( coodinates.length > 0 ) { 		
			return (
				<MapPolyline
					googleMapURL={
						googleMapsApiUrlBase +
						googleMapsApiKey 
					}
					markers={coodinates}
					loadingElement={<div style={{ height: "544px" }} />}
					containerElement={<div style={{ height: "544px" }} />}
					mapElement={<div style={{ height: `544px` }} />}
					defaultCenter={{
						lat: coodinates[0].lat,
						lng: coodinates[0].lng
					}}
					defaultZoom={12}
					typeMap
				/>
			);
		} else {
			const message = (typeMap === MAP_TYPES.COORDINATES) 
				? "Sin coordenadas válidas en el intervalo de fecha buscado" 
				: "No se conoce la última posición del dispositivo";
			return (<Alert messageType={MESSAGE_TYPE.INFO} message={message} />);
		}		
	}
	return rednderMap(typeMap);
};
