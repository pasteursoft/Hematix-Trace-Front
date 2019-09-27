/* global google */
import React from "react";
import {
	withGoogleMap,
	GoogleMap,
	withScriptjs,
	Marker,
	DirectionsRenderer
} from "react-google-maps";

class MapDirectionsRenderer extends React.Component {
	// state = {
	// 	directions: null,
	// 	error: null
	// };

	mapInfo = {
		directions: null,
		error: null
	};

	componentDidUpdate() {
		console.log("Update");
		const { places, travelMode } = this.props;
		const waypoints = places.map(p => {
			return {
				location: { lat: p.latitude, lng: p.longitude },
				stopover: true
			};
		});

		let origin = { lat: 20.6736, lng: -103.344 };
		let destination = { lat: 20.6736, lng: -103.344 };

		if (waypoints.length > 0) {
			origin = waypoints.shift().location;
			destination = waypoints.pop().location;
		}

		console.log("After shift:", waypoints);

		const directionsService = new google.maps.DirectionsService();
		directionsService.route(
			{
				origin: origin,
				destination: destination,
				travelMode: travelMode,
				waypoints: waypoints
			},
			(result, status) => {
				if (status === google.maps.DirectionsStatus.OK) {
					// this.setState({
					// 	directions: result
					// });
					console.log("Result:", result);
					this.mapInfo.directions = result;
				} else {
					// this.setState({ error: result });
					this.mapInfo.error = result;
				}
			}
		);
	}

	render() {
		if (this.mapInfo.error) {
			return <h1>{this.mapInfo.error}</h1>;
		}
		console.log("Directions:", this.mapInfo.directions);
		return (
			this.mapInfo.directions && (
				<DirectionsRenderer directions={this.mapInfo.directions} />
			)
		);
	}
}

const Map = withScriptjs(
	withGoogleMap(props => (
		<GoogleMap
			defaultCenter={props.defaultCenter}
			defaultZoom={props.defaultZoom}
		>
			{props.markers.map((marker, index) => {
				const position = { lat: marker.latitude, lng: marker.longitude };
				return <Marker key={index} position={position} />;
			})}
			<MapDirectionsRenderer
				places={props.markers}
				travelMode={google.maps.TravelMode.DRIVING}
			/>
		</GoogleMap>
	))
);

export default Map;
