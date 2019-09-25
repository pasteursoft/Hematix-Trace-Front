import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Select from "../../Components/UI/Select/Select";
import DatePicker from "../../Components/UI/DatePicker/DatePicker";
import Charts from "../Charts/Charts";

import axios from "axios";

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		marginTop: "5%",
		paddingRight: "10%",
		paddingLeft: "10%"
	}
}));

function ConfiguracionHielera() {
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
	yesterday = yesterday.setDate(today.getDate() - 1);
	today = transformDateFormat(today);
	yesterday = transformDateFormat(yesterday);

	//State
	const [select, setSelect] = useState({ values: [] });
	const [endDate, setEndDate] = useState({ value: today });
	const [startDate, setStartDate] = useState({
		value: yesterday
	});
	const [generalInformationSelected, setGeneralInformationSelected] = useState({
		name: "",
		mac: "",
		battery: ""
	});

	useEffect(() => {
		axios.get("http://rodrigofranco.net/getAll.php").then(res => {
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

	return (
		<div className={classes.root}>
			<Grid container spacing={10}>
				<Grid item xs={false} sm={2} md={2} lg={2} xl={2}></Grid>
				<Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
					<Select
						options={select.values}
						changed={handleSelectedChange}
						selected={generalInformationSelected.mac}
					/>
				</Grid>
				<Grid item xs={6} sm={2} md={2} lg={2} xl={2}>
					<DatePicker
						label="Fecha inicio"
						date={startDate.value}
						changed={handleStartDateChange}
					/>
				</Grid>
				<Grid item xs={6} sm={2} md={2} lg={2} xl={2}>
					<DatePicker
						label="Fecha fin"
						date={endDate.value}
						changed={handleEndDateChange}
					/>
				</Grid>
				<Grid item xs={false} sm={2} md={2} lg={2} xl={2}></Grid>
			</Grid>
			<Charts
				selectedMac={generalInformationSelected.mac}
				startDate={startDate.value}
				endDate={endDate.value}
			/>
		</div>
	);
}

export default ConfiguracionHielera;
