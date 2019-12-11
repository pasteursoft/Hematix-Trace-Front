import React from 'react';
import { Typography, Grid, makeStyles, withStyles, Divider, Slider, Card, TextField, CardHeader, CardActions, CardContent, Button } from '@material-ui/core'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MainLayout from '../../components/layout/mainLayout';
import queryString from 'query-string';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles({
    rowInputs: {
        width: '100%',
    },
	rootTitles: {
        width: '100%',
		paddingTop: 10,
		paddingBottom: 10,
	},
	cardRoot: {
		padding: '30px',
        margin: '20px',
    },
    rootGrid: {
        display: 'flex',
        width: '100%',
    }
});

const AirbnbSlider = withStyles({
    root: {
      color: '#3a8589',
      height: 3,
      padding: '13px 0',
    },
    thumb: {
      height: 27,
      width: 27,
      backgroundColor: '#fff',
      border: '1px solid currentColor',
      marginTop: -12,
      marginLeft: -13,
      boxShadow: '#ebebeb 0px 2px 2px',
      '&:focus,&:hover,&$active': {
        boxShadow: '#ccc 0px 2px 3px 1px',
      },
      '& .bar': {
        // display: inline-block !important;
        height: 9,
        width: 1,
        backgroundColor: 'currentColor',
        marginLeft: 1,
        marginRight: 1,
      },
    },
    active: {},
    valueLabel: {
      left: 'calc(-50% + 4px)',
    },
    track: {
      height: 3,
    },
    rail: {
      color: '#d8d8d8',
      opacity: 1,
      height: 3,
    },
  })(Slider);

export default ({location, history}) => {

	const classes = useStyles();

	return (
        <React.Fragment>
            <Card className={classes.cardRoot}>
                <CardHeader title={"Configuración de un Contenedor"} subheader={"Acción a realizar"}/>
                <Divider />
                <CardContent >
                    <Typography variant='h6'>Datos de identificación:</Typography>
                    <TextField
                        id="containerName"
                        label="Nombre del contenedor"
                        style={{ margin: 8 }}
                        helperText="Nombre que identificará el contenedor"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        id="macAddress"
                        label="Dirección física del termómetro"
                        style={{ margin: 8 }}
                        helperText="Es la dirección MAC, la encuentras en la cara anterior del termómetro en une etiqueta justo de bajo del código de barras"
                        fullWidth
                        margin="normal"
                    />
                    <Divider />
                    <Typography variant='h6'>Configuración de los cíclos:</Typography>
                    <Typography id='temperatureCycle' variant='h5'>Cíclo de temperatura en minutos</Typography>
                    <Slider
                        defaultValue={2}
                        aria-labelledby="temperatureCycle"
                        valueLabelDisplay="auto"
                        step={1}
                        min={1}
                        max={100}
                        color='secondary'
                    />
                    <Typography id='gpsCycle' variant='h5'>Ciclo de Geo localizacion minutos</Typography>
                    <Slider
                        defaultValue={2}
                        aria-labelledby="gpsCycle"
                        valueLabelDisplay="auto"
                        step={1}
                        min={1}
                        max={100}
                        color='secondary'
                    />
                    <Typography id='gpsTimeout' variant='h5'>Tiempo de espera de Geo Localización en minutos (1-2)</Typography>
                    <Slider
                        defaultValue={2}
                        aria-labelledby="gpsTimeout"
                        valueLabelDisplay="auto"
                        step={1}
                        min={1}
                        max={100}
                        color='secondary'
                    />
                    <Typography id='wiFiCycle' variant='h5'>Cíclos de WiFi en minutos</Typography>
                    <Slider
                        defaultValue={2}
                        aria-labelledby="wiFiCycle"
                        valueLabelDisplay="auto"
                        step={1}
                        min={1}
                        max={100}
                        color='secondary'
                    />
                    <Typography id='wiFiTimeout' variant='h5'>Tiempo de espera de WiFi en minutos (1-2)</Typography>
                    <Slider
                        defaultValue={2}
                        aria-labelledby="wiFiTimeout"
                        valueLabelDisplay="auto"
                        step={1}
                        min={1}
                        max={100}
                        color='secondary'
                    />
                    <Divider />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Fecha de última calibración"
                        />
                    </MuiPickersUtilsProvider>  
                </CardContent>
                <CardActions>
                    <Button color="secondary" startIcon={<CancelIcon />}>
                        Cancelar
                    </Button>
                    <Button startIcon={<ClearIcon  />}>
                        Limpiar
                    </Button>
                    <Button startIcon={<SaveIcon />}>
                        Guardar
                    </Button>
                </CardActions>
            </Card>
        </React.Fragment>
	);
};