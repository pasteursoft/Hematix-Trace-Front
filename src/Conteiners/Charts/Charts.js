import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Card from "../../Components/Card/Card";

import axios from "axios";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		marginTop: "5%"
	}
}));

function Charts(props) {
	const classes = useStyles();

	const [mapCoordinates, setMapCoordinates] = useState({
		coordinates: []
	});

	const [batteryData, setBatteryData] = useState({
		data: [],
		dateTime: []
	});

	const [temperatureData, setTemperatureData] = useState({
		data: [],
		dateTime: [],
		unit: ""
	});

	useEffect(() => {
		if (props.selectedMac !== "") {
			axios
				.get(
					"http://medicosoft.com.mx:2052/api/Measurements/MeasurementsData/" +
						props.selectedMac,
					{
						data: {
							page: 1,
							startDate: props.startDate,
							endDate: props.endDate
						}
					}
				)
				.then(res => {
					if (res.result.length > 0) {
						const values = res.result;
						const coordinates = [];
						const battery = {
							data: [],
							dateTime: []
						};
						const temperature = {
							data: [],
							dateTime: [],
							unit: ""
						};

						const dateTimeArray = [];

						for (let index = 0; index < values.length; index++) {
							coordinates.push({
								latitude: values[index].latitude,
								longitude: values[index].longitude
							});
							battery.data.push(values[index].batteryLevel);
							dateTimeArray.push(values[index].dateTime);
							temperature.data.push(values[index].temperature.Value);
						}
						battery.dateTime = dateTimeArray;
						temperature.dateTime = dateTimeArray;
						temperature.unit = values[0].temperature.Unit;

						setMapCoordinates({ coordinates: coordinates });
						setTemperatureData(temperature);
						setBatteryData(battery);
					}
				});
		}
	});

	return (
		<div className={classes.root}>
			<Grid container spacing={10}>
				<Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
					<Card type="Mapa" data={mapCoordinates} />
				</Grid>
				<Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
					<Card type="Batería" data={batteryData} />
				</Grid>
				<Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
					<Card type="Temperatura" data={temperatureData} />
				</Grid>
			</Grid>
		</div>
	);
}

export default Charts;
