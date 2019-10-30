import React from "./node_modules/react";
import { makeStyles } from "./node_modules/@material-ui/core/styles";
import Card from "./node_modules/@material-ui/core/Card";
import CardContent from "./node_modules/@material-ui/core/CardContent";
import Typography from "./node_modules/@material-ui/core/Typography";

import Map from "../ui/maps/Map";

import Chart from "react-apexcharts";

const googleMapsApiKey = (process.env.REACT_APP_API_KEY_GOOGLE !== "") 
	? process.env.REACT_APP_API_KEY_GOOGLE : "AIzaSyBgq1CzLtAXz1zsIM_MZIa6pYzpA5XSWiM";

const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: "100%",
		width: "100%"
	}
}));

function Cards(props) {
	const classes = useStyles();

	let renderChartOrMap = null;

	if (props.type === "Mapa" && props.data.coordinates.length > 0) {
		renderChartOrMap = (
			<Map
				googleMapURL={
					"https://maps.googleapis.com/maps/api/js?key=" +
					googleMapsApiKey +
					"&libraries=geometry,drawing,places"
				}
				markers={props.data.coordinates}
				loadingElement={<div style={{ height: "280px" }} />}
				containerElement={<div style={{ height: "280px" }} />}
				mapElement={<div style={{ height: `280px` }} />}
				defaultCenter={{
					lat: props.data.coordinates[0].latitude,
					lng: props.data.coordinates[0].longitude
				}}
				defaultZoom={8}
			/>
		);
	} else if (props.type !== "Mapa" && props.data.data.length > 0) {
		const optionsChart = {
			xaxis: {
				categories: props.data.dateTime
			}
		};

		const seriesChart = [
			{
				name: props.type,
				data: props.data.data
			}
		];

		renderChartOrMap = (
			<Chart options={optionsChart} series={seriesChart} type="line" />
		);
	}

	return (
		<Card className={classes.card}>
			<CardContent>
				{renderChartOrMap}
				<Typography gutterBottom variant="h5" component="h2">
					{props.type}
				</Typography>
			</CardContent>
		</Card>
	);
}

export default Cards;
