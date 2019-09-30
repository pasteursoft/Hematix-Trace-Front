import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Card from "../../Components/Card/Card";

import axios from "axios";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		marginTop: "2%",
		marginBottom: "5%"
	},
	sectionDesktop: {
		display: "inhirit",
		[theme.breakpoints.down("sm")]: {
			display: "none"
		}
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
<<<<<<< HEAD
			async function fetchData() {
				const instance = axios.create({
					headers: {
						"Content-Type": "application/json"
=======
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
>>>>>>> originAmazon/developer
					}
				});

				await instance
					.get(
						"http://192.168.0.38:2052/api/Measurements/MeasurementsData/" +
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
						if (res.data.results.length > 0) {
							const values = res.data.results;
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
								if (values[index].latitude !== 0) {
									coordinates.push({
										latitude: values[index].latitude,
										longitude: values[index].longitude
									});
								}

								battery.data.push(values[index].batteryLevel);
								dateTimeArray.push(values[index].dateTime);
								temperature.data.push(values[index].temperature.value);
							}
							battery.dateTime = dateTimeArray;
							temperature.dateTime = dateTimeArray;
							temperature.unit = values[0].temperature.unit;

							setTemperatureData(temperature);
							setBatteryData(battery);
							setMapCoordinates({ coordinates: coordinates });
						}
					});
			}
			fetchData();
		}
	}, [props.selectedMac, props.endDate, props.startDate]);

	return (
		<div className={classes.root}>
			<Grid container spacing={10} justify="center" alignItems="center">
				<Grid
					item
					xs={false}
					sm={false}
					md={2}
					lg={3}
					xl={3}
					className={classes.sectionDesktop}
				></Grid>
				<Grid
					item
					xs={12}
					sm={12}
					md={8}
					lg={5}
					xl={5}
					className={classes.temperature}
				>
					<Card type="Temperatura" data={temperatureData} />
				</Grid>
				<Grid
					item
					xs={false}
					sm={false}
					md={2}
					lg={3}
					xl={3}
					className={classes.sectionDesktop}
				></Grid>

				<Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
					<Card type="Batería" data={batteryData} />
				</Grid>
				<Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
					<Card type="Mapa" data={mapCoordinates} />
				</Grid>
			</Grid>
		</div>
	);
}

export default Charts;
