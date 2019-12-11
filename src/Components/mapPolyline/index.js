import React from "react";
import { Polyline,
	withGoogleMap,
	GoogleMap,
	withScriptjs,
	Marker
} from "react-google-maps";

const MapPolyline = withScriptjs(
	withGoogleMap(props => {
		return (
			<GoogleMap defaultCenter={props.defaultCenter}
			defaultZoom={props.defaultZoom}>
			{props.markers.map((marker, index) => {
							const position = { lat: marker.lat, lng: marker.lng };
							// Sustituir ese console log por las acciones que tendrá al pasar sobre el punto
							return <Marker key={index} icon={'http://maps.google.com/mapfiles/kml/paddle/red-circle-lv.png'} position={position} onMouseOver={e=>{console.log(position)}}/>;
						})}
				<Polyline
					path={props.markers}
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

export default MapPolyline;