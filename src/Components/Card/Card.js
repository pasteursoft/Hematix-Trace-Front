import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import Map from "../UI/Map/Map";

import Chart from "react-apexcharts";

const googleMapsApiKey = "AIzaSyBgq1CzLtAXz1zsIM_MZIa6pYzpA5XSWiM";

const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: "100%",
		width: "100%"
	}
}));

function Cards(props) {
	const classes = useStyles();

	let renderChartOrMap = null;

	if (props.type === "Mapa") {
		const mapPoints = {
			data: props.data.coordinates
		};

		console.log("Mapa:", mapPoints);

		renderChartOrMap = (
			<Map
				googleMapURL={
					"https://maps.googleapis.com/maps/api/js?key=" +
					googleMapsApiKey +
					"&libraries=geometry,drawing,places"
				}
				markers={mapPoints.data}
				loadingElement={<div style={{ height: "280px" }} />}
				containerElement={<div style={{ height: "280px" }} />}
				mapElement={<div style={{ height: `280px` }} />}
				defaultCenter={{ lat: 20.6736, lng: -103.344 }}
				defaultZoom={8}
			/>
		);
	} else {
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
