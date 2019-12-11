/* global google */
import React, { useEffect, useState } from "react";
import { Polyline,
	withGoogleMap,
	GoogleMap,
	withScriptjs,
	Marker,
	DirectionsRenderer
} from "react-google-maps";

/*
function MapDirectionsRenderer(props) {
	const [mapInfo, setMapInfo] = useState({
		directions: null,
		error: null
	});

	useEffect(() => {
		const places = props.places;	
		const travelMode = props.travelMode;
		//const { places, travelMode } = props;
		const waypoints = places.map(p => {
			return {
				location: { lat: p.latitude, lng: p.longitude },
				stopover: false
			};
		});

		let origin = { lat: 20.6736, lng: -103.344 };
		let destination = { lat: 20.6736, lng: -103.344 };

		if (waypoints.length > 0) {
			origin = waypoints.shift().location;
			destination = waypoints.pop().location;
		}

		const directionsService = new google.maps.Polyline();
		directionsService.route(
			{
				origin: origin,
				destination: destination,
				travelMode: travelMode,
				waypoints: waypoints
			},
			async (result, status) => {
				if (status === google.maps.DirectionsStatus.OK) {
					setMapInfo(oldState => ({
						...oldState,
						directions: result
					}));
				} else {
					setMapInfo(oldState => ({
						...oldState,
						error: result
					}));
				}
			}
		);
	}, [props.places, props.travelMode]);

	if (mapInfo.error) {
		//return <h1>{mapInfo.error}</h1>;
		return null;
	}
	return (
		mapInfo.directions && <DirectionsRenderer directions={mapInfo.directions} />
	);


} */

const Map = withScriptjs(
	withGoogleMap(props => {

		const cordinates =  [
			{ lat: 0, lng: 0 },
			{ lat: 10, lng: 10 },
			{ lat: 20, lng: 20 },
			{ lat: 30, lng: 30 },
			{ lat: 40, lng: 40 },
			{ lat: 55, lng: 50 }
		  ];

		
		return (
			<GoogleMap defaultCenter={props.defaultCenter}
			defaultZoom={props.defaultZoom}>


			{props.markers.map((marker, index) => {
							const position = { lat: marker.latitude, lng: marker.longitude };
							return <Marker key={index} position={position} />;
						})}

				<Polyline
					path={cordinates}
					clickable
					options={{
						strokeColor: '#A21F3B',
						strokeOpacity: '0.8',
						strokeWeight: 4
					}}
					visible
					/>
				
			</GoogleMap>
		);
	})
);

export default Map;

/*

			<GoogleMap
				defaultCenter={props.defaultCenter}
				defaultZoom={props.defaultZoom}
			>
<MapDirectionsRenderer
					places={props.markers}
					travelMode={google.maps.TravelMode.WALKING}
				/>


				{props.markers.map((marker, index) => {
					const position = { lat: marker.latitude, lng: marker.longitude };
					return <Marker key={index} position={position} />;
				})}
*/