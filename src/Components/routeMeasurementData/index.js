import React, { useState, useEffect } from '../../../node_modules/react';
import { Grid, 
	makeStyles, 
	createMuiTheme,
	InputLabel, 
	Select, 
	MenuItem,
	Button } from '../../../node_modules/@material-ui/core';
import { ThemeProvider } from "@material-ui/styles";	
import { useDispatch, useSelector } from 'react-redux';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import SearchIcon from '@material-ui/icons/Search';
import { SearchConfigurationDevices } from '../../redux/actions/ConfigurationsService';
import { configurationsResult,
		configurationsError,
		configurationsResponse
	 } from '../../redux/selectors';
import Alert from '../../components/alert';
import ContainerRouteCard from '../../components/cards/containerRouteCard';
import { MESSAGE_TYPE } from '../../components/alert/messageType';

const useStyles = makeStyles({
	field: {
		width: '100%',
	},
	rootGrid: {
		padding: '10px'
	}
});

const defaultMaterialTheme = createMuiTheme({
	palette: {
		primary:  {
            main: "#A21F3B",
            light: '#d85465',
            dark: '#6d0016',
            contrastText: '#ffffff',
        },
	  },
  });

export default ({...props}) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const configResult = useSelector(configurationsResult);
	const configError = useSelector(configurationsError);
	const configResponse = useSelector(configurationsResponse);

	const [macAddress, setMacAddress] = useState((props.params.macAddress) ? props.params.macAddress : "");
	const [startDateTime, setStartDateTime] = useState((props.params.startDate) ? new Date(props.params.startDate) : new Date(Date.now() - 3600000) );
	const [endDateTime, setEndDateTime] = useState( (props.params.endDate) ? new Date(props.params.endDate) : Date.now() );
	const [error, setError] = useState(false);
	const [errorEndDate, setErrorEndDate] = useState(false);
	const [errorStartDate, setErrorStartDate] = useState(false);
	const [payload, setPayload] = useState(null);

	const renderSelectorOptions = () => {
		if (configResult && !configError) {
			let items = [];
			configResult.results.map((item) => {
				items.push(<MenuItem name={item.containerName} value={item.macAddress}>{`${item.containerName} (${item.macAddress})`}</MenuItem>);
			});
			return(items);
		} 
	};

	const renderErrorSelectorOptions = () => {
		if (configResponse !== 200) {
			return (<Alert messageType={MESSAGE_TYPE.ERROR} message={"Verifique su conexión a internet e intentelo de nuevo, si no da resultado contacte a soporte"}/>);
		}
	}

	const handleMacChangeSelector = e => {
		setMacAddress(e.target.value);
	};

	const handleChangeStartDate = e => {
		if ((startDateTime && endDateTime) && (startDateTime > endDateTime))
		{
			setErrorStartDate(true);
		} else {
			setErrorStartDate(false);
		}
		const event = (e) ? new Date(e) : null;
		setStartDateTime(event);
	};

	const handleChangeEndDate = e => {
		if ((startDateTime && endDateTime) && (endDateTime < startDateTime))
		{
			setErrorEndDate(true);
		} else {
			setErrorEndDate(false);
		}
		const event = (e) ? new Date(e) : null;
		setEndDateTime(event);
	};

	const handleOnClickSearch = e => {
		// No permitir diferencias de fechas mayores a 24 h, buscar hasta 1600 registros en la paginación
		setPayload(null);
		if (macAddress || macAddress !== "") {
			if (errorEndDate || errorStartDate) {
				setErrorEndDate(true);
				setErrorStartDate(true);
			} else {
				setError(false);
				setErrorEndDate(false);
				setErrorStartDate(false);
				setPayload({
					uriParameters: {
						macAddress: macAddress
					},
					queryParams: {
						startDate: (startDateTime) ? startDateTime.toISOString() : null,
						endDate: (endDateTime) ? endDateTime.toISOString() : null,
						page: 1,
						pagination: 1800,
					}
				});
			}
		} else {
			setError(true);
		}
	};

	const renderResults = () => {
		if (payload) {
			return(<ContainerRouteCard search={payload} />);
		} 
	}
	
	useEffect(() => {
		const payloadConfig = {
			queryParams: {
				pagination: 0
			}
		};
		if (!configResult && !configError) {
			dispatch(SearchConfigurationDevices(payloadConfig));
		}
	});

	return ( 		
		<React.Fragment>
			<Grid container
					direction="row"
					justify="flex-start"
					alignItems="center"
					className={classes.rootTitles}>
				<Grid xs={12} sm={12} md={12} lg={12} xl={12} spacing={3} className={classes.rootGrid} item>
					{renderErrorSelectorOptions()}
				</Grid>
				<Grid xs={12} sm={12} md={6} lg={3} xl={3} spacing={3} className={classes.rootGrid} item>
					<InputLabel id="label" error={error}>Contenedor</InputLabel>
					<Select labelId="label" id="select" value={macAddress} className={classes.field} onChange={handleMacChangeSelector} error={error}>
						{renderSelectorOptions()}
					</Select>
				</Grid>
				<Grid xs={12} sm={12} md={6} lg={3} xl={3} spacing={3} className={classes.rootGrid} item>
					<ThemeProvider theme={defaultMaterialTheme}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<DateTimePicker
								error={errorStartDate}
								disableFuture
								variant='dialog'
								emptyLabel=""
								className={classes.field}
								clearable={true}
								format="dd/MM/yyyy hh:mm a"
								id="dateTime-start"
								label="Fecha y hora de inicio de búsqueda"
								value={startDateTime}
								onChange={handleChangeStartDate}
								onAccept={handleChangeStartDate}
							/>
						</MuiPickersUtilsProvider> 
					</ThemeProvider>
				</Grid>
				<Grid xs={12} sm={12} md={6} lg={3} xl={3} spacing={3} className={classes.rootGrid} item>
					<ThemeProvider theme={defaultMaterialTheme}>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<DateTimePicker
								disableFuture
								error={errorEndDate}
								variant='dialog'
								emptyLabel=""
								clearable={true}
								className={classes.field}	
								format="dd/MM/yyyy hh:mm a"
								id="dateTime-end"
								label="Fecha y hora de fin de búsqueda"
								value={endDateTime}
								onChange={handleChangeEndDate}
								onAccept={handleChangeEndDate}
							/>
						</MuiPickersUtilsProvider>
					</ThemeProvider>
				</Grid>
				<Grid xs={12} sm={12} md={6} lg={3} xl={3} spacing={3} className={classes.rootGrid} item>
					<Button
						className={classes.field}
						variant="contained"
						color="secondary"
						startIcon={<SearchIcon />}
						onClick={handleOnClickSearch}
						>
							Buscar
					</Button>
				</Grid>
			</Grid>
			<Grid container
					direction="row"
					justify="flex-start"
					alignItems="center"
					className={classes.rootTitles}>
				<Grid xs={12} sm={12} md={12} lg={12} xl={12} spacing={3} className={classes.rootGrid} item>
					{renderResults()}
				</Grid>
			</Grid>
        </React.Fragment>
	);
};