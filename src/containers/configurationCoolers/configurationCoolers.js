import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Select from "../../components_revisar/UI/Select/Select";
import DatePicker from "../../components_revisar/ui/datePickers/DatePicker";
import HourPicker from "../../components_revisar/ui/hourPickers/HourPicker";
import Charts from "../charts/charts";

import axios from "axios";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		marginTop: "2%",
		paddingRight: "5%",
		paddingLeft: "5%"
	}
}));

function configurationCoolers() {
	
	const classes = useStyles();

	const transformDateFormat = date => {
		let newDateFormat = new Date(date).toISOString();
		const aux = newDateFormat.split(".");
		aux[1] = "-00:00";
		newDateFormat = aux.join("");
		return newDateFormat;
	};

	let today = new Date();
	let yesterday = new Date();
	const currentTime =
		today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
	yesterday = yesterday.setDate(today.getDate() - 1);
	today = transformDateFormat(today);
	yesterday = transformDateFormat(yesterday);

	//State
	const [select, setSelect] = useState({ values: [] });
	const [endDate, setEndDate] = useState({ value: today });
	const [endTime, setEndTime] = useState({ value: currentTime });
	const [startDate, setStartDate] = useState({
		value: yesterday
	});
	const [startTime, setStartTime] = useState({ value: currentTime });
	const [generalInformationSelected, setGeneralInformationSelected] = useState({
		name: "",
		mac: "",
		battery: ""
	});

	useEffect(() => {
		axios.get(process.env.REACT_APP_CONFIGURATION_DEVICES).then(res => {
			const values = {};
			let selectedItem = res.data.devices[0].mac ? res.data.devices[0].mac : "";
			values["values"] = res.data.devices;
			setSelect(values);
			setGeneralInformationSelected(oldState => ({
				...oldState,
				mac: selectedItem
			}));
		});
	}, []);

	const handleSelectedChange = event => {
		setGeneralInformationSelected(oldState => ({
			...oldState,
			mac: event.target.value
		}));
	};

	const handleStartDateChange = date => {
		setStartDate({ value: transformDateFormat(date) });
	};

	const handleEndDateChange = date => {
		setEndDate({ value: transformDateFormat(date) });
	};

	const handleEndTimeChange = hour => {
		const dateAux = new Date(hour);
		const hourFinal =
			dateAux.getHours() +
			":" +
			dateAux.getMinutes() +
			":" +
			dateAux.getSeconds();
		console.log("Hora final:", hourFinal);
		setEndTime({ value: hourFinal });
	};

	const handleStartTimeChange = hour => {
		const dateAux = new Date(hour);
		const hourFinal =
			dateAux.getHours() +
			":" +
			dateAux.getMinutes() +
			":" +
			dateAux.getSeconds();
		console.log("Hora inicio:", hourFinal);
		setStartTime({ value: hourFinal });
	};

	return (
		<div className={classes.root}>
			<Grid container spacing={10} justify="center" alignItems="center">
				<Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
					<Select
						options={select.values}
						changed={handleSelectedChange}
						selected={generalInformationSelected.mac}
					/>
				</Grid>
				<Grid item xs={6} sm={3} md={3} lg={2} xl={2}>
					<DatePicker
						label="Fecha inicio"
						date={startDate.value}
						changed={handleStartDateChange}
					/>
				</Grid>
				<Grid item xs={6} sm={3} md={3} lg={2} xl={2}>
					<HourPicker
						label="Hora inicio"
						date={startTime.value}
						changed={handleStartTimeChange}
					/>
				</Grid>
				<Grid item xs={6} sm={3} md={3} lg={2} xl={2}>
					<DatePicker
						label="Fecha fin"
						date={endDate.value}
						changed={handleEndDateChange}
					/>
				</Grid>
				<Grid item xs={6} sm={3} md={3} lg={2} xl={2}>
					<HourPicker
						label="Hora fin"
						date={endTime.value}
						changed={handleEndTimeChange}
					/>
				</Grid>
			</Grid>
			<Charts
				selectedMac={generalInformationSelected.mac}
				startDate={startDate.value}
				endDate={endDate.value}
			/>
		</div>
	);
}

export default configurationCoolers;
