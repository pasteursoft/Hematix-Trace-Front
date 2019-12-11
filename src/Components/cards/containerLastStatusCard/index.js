import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, 
		 IconButton, 
		 CardHeader, 
		 CardActions, 
		 CardContent, 
		 Typography, 
		 CardMedia, 
		 Tooltip,
		 Divider,
		 Grid } from "@material-ui/core"; 
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SettingsIcon from '@material-ui/icons/Settings';
import BatteryAlertIcon from '@material-ui/icons/BatteryAlert';
import Battery20Icon from '@material-ui/icons/Battery20';
import Battery30Icon from '@material-ui/icons/Battery30';
import Battery50Icon from '@material-ui/icons/Battery50';
import Battery60Icon from '@material-ui/icons/Battery60';
import Battery80Icon from '@material-ui/icons/Battery80';
import Battery90Icon from '@material-ui/icons/Battery90';
import BatteryFullIcon from '@material-ui/icons/BatteryFull';
import BatteryUnknownIcon from '@material-ui/icons/BatteryUnknown';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import Map from '../../map';
import { MAP_TYPES } from '../../map/mapsEnums'
import Alert from '../../alert';
import { MESSAGE_TYPE } from '../../alert/messageType';

const useStyles = makeStyles(theme => ({
	card: {
		width: "100%",
		padding: "20px",
		margin: "1vh",
	},
	media: {
		width: "100%"
	},
	cardActions: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	avatar: {
		color: "white",
		backgroundColor: "red",
	},
	colorOk: {
		color: "green",
	}, 
	colorBad: {
		color: "red"
	},
	tempTextSize: {
		fontSize: "5.8em",
		display: "flex",
	},
	error: {
		backgroundColor: "rgba(255, 0, 0, 0.5)",
		color: 'rgb(128, 0, 0)',
		padding: "5px",
		margin: "5px",
		border: "0px",
		boxShadow: 'none',
	},
	errorContent: {
		display: 'flex',
		paddingLeft: '5px',
		paddingRight: '5px',
	},
	rootTemperature: {
		display: 'flex',
		alignItems: "center",
		justifyContent: "center",
	},
	temperatureValue: {
		...theme.rootTemperature,
	},
	temperatureRange: {
		color: "rgba(64, 64, 64, 0.5)",
		fontSize: "1.2em",
		fontWeight: 'bolder',
	},
	dateTemperatureLocalization: {
		color: "rgba(64, 64, 64, 0.8)",
		fontSize: "2em",
	},
	titleTemperatureLocalization: {
		color: "rgba(0, 0, 0, 0.8)",
		fontSize: "1em",
		fontWeight: 'bolder',
	},
	batteryLevel: {
		color: "rgba(0, 0, 0, 0.8)",
		fontSize: "1em",
		fontWeight: 'bolder',
	},
	batteryDate: {
		color: "rgba(0, 0, 0, 0.5)",
		fontSize: "0.9em",
	},
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

export default ({history, location, ...props}) => {
	const classes = useStyles();
	const [cardData] = useState(props.cardData);

	const handleClickConfiguration = e => {
		history.push(`/configurationContainer?macAddress=${cardData.macAddress}`);
	}
	
	const handleClickDetails = e => {
		history.push(`/containersTemperatures?macAddress=${cardData.macAddress}`);
	}

	const batteryLevelIcon = (batteryLevel) => {
		if (batteryLevel > 90 && batteryLevel <= 100) {
			return (<BatteryFullIcon fontSize='large' />);
		} else if (batteryLevel > 80 && batteryLevel <= 90) {
			return (<Battery90Icon fontSize='large' />);
		} else if (batteryLevel > 60 && batteryLevel <= 80) {
			return (<Battery80Icon fontSize='large' />);
		} else if (batteryLevel > 50 && batteryLevel <= 60) {
			return (<Battery60Icon fontSize='large' />);
		} else if (batteryLevel > 30 && batteryLevel <= 50) {
			return (<Battery50Icon fontSize='large' />);
		} else if (batteryLevel > 20 && batteryLevel <= 30) {
			return (<Battery30Icon fontSize='large' />);
		} else if (batteryLevel > 10 && batteryLevel <= 20) {
			return (<Battery20Icon fontSize='large' />);
		} else if (batteryLevel >= 0 && batteryLevel <= 10) {
			return (<BatteryAlertIcon fontSize='large' />);
		} else {
			return (<BatteryUnknownIcon fontSize='large' />);
		}
	};

	const batteryLevelInfo = (batteryLevel, dateTime) => {
		const dateToDisplay = displayDateForBattery(dateTime);
		dateTime = dateToDisplay.date;
		let time = dateToDisplay.time;
		let batteryLevelText = "";
		if (batteryLevel < 0 || batteryLevel > 100) {
			dateTime = "";
			time = "";
			batteryLevelText = "Desconocido";
		} else {
			batteryLevelText = Math.trunc(batteryLevel) + " %";
		}
		return (
			<React.Fragment>
				<Grid container className={[classes.rootTemperature]}> 
 					<Grid item>
						{batteryLevelIcon(batteryLevel)}
					</Grid>
				</Grid>
				<Grid container className={[classes.rootTemperature]}> 
					<Grid item>
						<Typography className={classes.batteryLevel}>{batteryLevelText}</Typography>
					</Grid>
				</Grid>
				<Grid container className={[classes.rootTemperature]}> 
					<Grid item>
						<Typography className={classes.batteryDate}>{dateTime}</Typography>	
					</Grid>
				</Grid>
				<Grid container className={[classes.rootTemperature]}> 
					<Grid item>
						<Typography className={classes.batteryDate}>{time}</Typography>
					</Grid>
				</Grid>
			</React.Fragment>
		);
	};

	const dateToObject = (dateString) => {
		const date = new Date(dateString);
		return {
			days: (date.getDate() < 10) ? '0' + date.getDate() : date.getDate().toString(),
			months: ((date.getMonth() + 1) < 10) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString(),
			year: date.getFullYear().toString(),
			hours: (date.getHours() < 10) ? '0' + date.getHours() : date.getHours().toString(),
			minutes: (date.getMinutes() < 10) ? '0' + date.getMinutes() : date.getMinutes().toString(),
			seconds: (date.getSeconds() < 10) ? '0' + date.getSeconds() : date.getSeconds().toString(),
			dateObj: date
		};
	};

	const displayDateForBattery = (date) => {
		const dateObj = dateToObject(date);
		return ({ 
			date: `${dateObj.days}/${dateObj.months}/${dateObj.year}`,
			time: `${dateObj.hours}:${dateObj.minutes} h`});
	};

	const displayDate = (date) => {
		const dateObj = dateToObject(date);
		return ({ 
			dateTime: `${dateObj.days}/${dateObj.months}/${dateObj.year} ${dateObj.hours}:${dateObj.minutes} h`});
	};

	const temperatureAlertIndicator = (temperatureLevel) => {
		const MinTempAlarm = process.env.REACT_APP_TEMP_MIN;
		const MaxTempAlarm = process.env.REACT_APP_TEMP_MAX;
		if (temperatureLevel > MaxTempAlarm) {
			return (<ArrowUpwardIcon fontSize="large" className={[classes.colorBad,classes.tempTextSize]}/>);
		} else if (temperatureLevel < MinTempAlarm) {
			return (<ArrowDownwardIcon fontSize="large" className={[classes.colorBad,classes.tempTextSize]}/>);
		} else {
			return (<CheckCircleIcon fontSize="large" className={[classes.colorOk, classes.tempTextSize]}/>);
		}
	};

	const temperatureAlertInfo = (temperatureLevel) => {
		return (
			<React.Fragment>
				<Grid container className={[classes.rootTemperature]}>
					<Grid item>{temperatureAlertIndicator(temperatureLevel)}</Grid>
				</Grid>
				<Grid container className={[classes.rootTemperature]}>
					<Grid item><Typography className={[classes.temperatureRange]}>( {process.env.REACT_APP_TEMP_MIN} a {process.env.REACT_APP_TEMP_MAX} °C )</Typography></Grid>
				</Grid>
			</React.Fragment>
		);
	};

	const renderHeaderCard = (data) => {
		if (data.lastStatus[0].batteryLevelStatus) {
			return (<CardHeader title={data.containerName} subheader={"MAC: " + data.macAddress} action={
				<React.Fragment>
					{batteryLevelInfo(data.lastStatus[0].batteryLevelStatus.batteryLevel, data.lastStatus[0].batteryLevelStatus.dateTime)}
				</React.Fragment>
				} />);
		} else {
			return (<CardHeader title={data.containerName} subheader={"MAC: " + data.macAddress} action={
				<React.Fragment>
					{batteryLevelInfo(-1, "")}
				</React.Fragment>
				} />);
		}
	};

	const renderContentCard = (data) => {
		if (data.lastStatus[0].measurementStatus) {
			return (<React.Fragment>
				<Grid container className={[classes.rootTemperature]}>
					<Grid item className={[classes.temperatureValue]}>
						<Typography className={[classes.tempTextSize]}>{data.lastStatus[0].measurementStatus.temperature.value}{" "}{data.lastStatus[0].measurementStatus.temperature.unit}</Typography>
					</Grid>
					<Grid item className={[classes.temperatureInterpretation]}>
						{temperatureAlertInfo(data.lastStatus[0].measurementStatus.temperature.value)}
					</Grid>
				</Grid>
				<Grid container className={[classes.rootTemperature]}>
					<Grid item> 
						<Typography className={classes.dateTemperatureLocalization}>
							{displayDate(data.lastStatus[0].measurementStatus.dateTime).dateTime}
						</Typography>
					</Grid>
				</Grid>	
				<Grid container className={[classes.rootTemperature]}>
					<Grid item>
						<Typography className={classes.titleTemperatureLocalization}>Última lectura registrada</Typography>
					</Grid>
				</Grid>
			</React.Fragment>);
		} else {
			const message = "Sin lectura de temperatura conocida";
			return (<React.Fragment>
					<Alert messageType={MESSAGE_TYPE.INFO} message={message} />
				</React.Fragment>);
		}
	};

	const renderMediaCard = (data) => {
		if (data.lastStatus[0].geoPositionStatus) {
			return (<React.Fragment>
				<Map type={MAP_TYPES.LAST_STATUS_DEVICE} data={data.lastStatus[0]} />
					<Grid container className={[classes.rootTemperature]}>
						<Grid item> 
							<Typography className={classes.dateTemperatureLocalization}>
								{displayDate(data.lastStatus[0].geoPositionStatus.dateTime).dateTime}
							</Typography>
						</Grid>
					</Grid>	
					<Grid container className={[classes.rootTemperature]}>
						<Grid item>
							<Typography className={classes.titleTemperatureLocalization}>Última posición registrada</Typography>
						</Grid>
					</Grid>
			</React.Fragment>);
		} else {
			const message = "Sin última posición conocida"; 
			return (
				<React.Fragment>
					<Alert messageType={MESSAGE_TYPE.INFO} message={message} />
				</React.Fragment>
				);
		}
	};

	const renderComponent = () => {
		if (cardData.lastStatus) {
			return (<React.Fragment>
					{renderHeaderCard(cardData)}
					<Divider />
					<CardContent>
						{renderContentCard(cardData)}
					</CardContent>
					<Divider />
					<CardMedia>
						{renderMediaCard(cardData)}
					</CardMedia>
					<Divider />
					<CardActions className={classes.cardActions}>
						<Tooltip title={"Configurar"}>
							<IconButton aria-label="Configurar contenedor" onClick={handleClickConfiguration}>
									<SettingsIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title={"Detalles"}>
							<IconButton aria-label="Abrir detalle" onClick={handleClickDetails}>
								<MoreVertIcon />
							</IconButton>
						</Tooltip>
					</CardActions>
			</React.Fragment>);
		} else {
			const message = "Parece que este contenedor no tiene datos";
			return (
			<React.Fragment>
				<CardHeader title={cardData.containerName} subheader={"MAC: " + cardData.macAddress} action={
					<React.Fragment>
						{batteryLevelInfo(-1, "")}
					</React.Fragment>
					} />
				<Divider />
				<CardContent>
					<Alert messageType={MESSAGE_TYPE.INFO} message={message} />
				</CardContent>
				<Divider />
				<CardActions className={classes.cardActions}>
					<Tooltip title={"Configurar"}>
						<IconButton aria-label="Configurar contenedor" onClick={handleClickConfiguration}>
								<SettingsIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title={"Detalles"}>
						<IconButton aria-label="Abrir detalle" onClick={handleClickDetails}>
							<MoreVertIcon />
						</IconButton>
					</Tooltip>
				</CardActions>
			</React.Fragment>);
		}
		
	}
	// me mandan ya la información de configuracion 
	// llamadas a last status
	return (
		<Card className={classes.card}>
			{renderComponent()}
		</Card>
	);
}