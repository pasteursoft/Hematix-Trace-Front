import React, { useState, useEffect } from 'react';
import Chart from "react-apexcharts";
import { Typography, 
    Grid, 
    Card,
	makeStyles, 
	createMuiTheme,
	InputLabel, 
    Select, 
    CircularProgress,
	MenuItem,
    Button } from '@material-ui/core';
import Map from '../../map';
import MAP_TYPES from '../../map';
import { useDispatch, useSelector } from 'react-redux';
import { MuiPickersUtilsProvider, DateTimePicker, KeyboardDateTimePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import SearchIcon from '@material-ui/icons/Search';

import { MeasurementsDataBulk, MeasurementsDataBulkRestart } from '../../../redux/actions/MeasurementsServiceBulk';
import { isMeasurementBulkDataLoading,
        measurementsBulkResult,
        measurementsBulkError,
        measurementsBulkResponse,
     } from '../../../redux/selectors';
     
import Alert from '../../alert';
import { MESSAGE_TYPE } from '../../alert/messageType';

const useStyles = makeStyles({
    rootCard: {
        padding: '5px',
    },
	field: {
		width: '100%',
	},
	rootGrid: {
		padding: '10px'
	}
});

export default ({...props}) => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const isLoading = useSelector(isMeasurementBulkDataLoading);
    const result = useSelector(measurementsBulkResult);
    const error = useSelector(measurementsBulkError);
    const response = useSelector(measurementsBulkResponse);

    useEffect(() => {
            dispatch(MeasurementsDataBulkRestart());
            dispatch(MeasurementsDataBulk(props.search));
    }, [props.search]);
    

    const renderAll = () => {
         if (result && !error) {
            const datos = {
                options: {
                  chart: {
                    id: "basic-line"
                  },
                  xaxis: {
                    type: 'datetime',
                    categories: null,
                    labels: { 
                        show: true,
                        hideOverlappingLabels: true,
                        datetimeFormatter: {
                            year: 'yyyy',
                            month: "MMM 'yy",
                            day: 'dd MMM',
                            hour: 'HH:mm',
                        }
                    }
                  }
                },
                series: [
                  {
                    name: "Temperaturas",
                    data: null,
                  }
                ]
              };
            if (result[0].data.count > 0) {
                let temperaturas = [];
                let fechas = [];
                let dataCoordenadas = [];
                result.map(item => {
                    dataCoordenadas.push(dataCoordenadas);
                    item.data.results.map( itemI => {
                        fechas.push(itemI.dateTime);
                        temperaturas.push(itemI.temperature.value);
                        
                    });
                });
                datos.options.xaxis.categories = fechas;
                datos.series[0].data = temperaturas;

                return (<React.Fragment>
                    <Card className={classes.rootCard}>
                    <Grid container
                        direction="row" justify="flex-start"
                        alignItems="baseline"
                        className={classes.rootTitles}>
                            <Grid xs={12} sm={12} md={12} lg={6} xl={6} spacing={3} className={classes.rootGrid} item>
                                <Typography variant='h6'>Mapa de ruta según el GPS</Typography>
                                <Map type={MAP_TYPES.COORDINATES} data={result[0].data}  />
                            </Grid>
                            <Grid xs={12} sm={12} md={12} lg={6} xl={6} spacing={3} className={classes.rootGrid} item>
                                <Typography variant='h6'>Gráfica de temperaturas</Typography>
                                <Chart
                                    options={datos.options}
                                    series={datos.series}
                                    type="line"
                                    width="100%"
                                />
                            </Grid>
                    </Grid>
                    <Grid container
                        direction="row" justify="flex-start"
                        alignItems="baseline"
                        className={classes.rootTitles}>
                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} spacing={3} className={classes.rootGrid} item>
                            {/* Card tabla*/}
                            </Grid>
                    </Grid>
                    <Grid container
                        direction="row" justify="flex-start"
                        alignItems="baseline"
                        className={classes.rootTitles}>
                            <Grid xs={12} sm={12} md={12} lg={12} xl={12} spacing={3} className={classes.rootGrid} item>
                            {/* Card paginador*/}
                            </Grid>
                    </Grid>
                    </Card>
                </React.Fragment>
                );			
            } else {
                return (<React.Fragment>
                    <Alert messageType={MESSAGE_TYPE.INFO} message={`No hemos encontrado resultados con sus parámetros de búsqueda.`} />
                </React.Fragment>);
            }
		} else if (isLoading) {
			return (
				<Grid container direction="row" justify="center" alignItems="center" > 
				<Grid item>
					<CircularProgress size={100} color="secondary"/>
				</Grid>
			</Grid>
			); 
		} else {
			return (<React.Fragment>
						<Alert messageType={MESSAGE_TYPE.ERROR} message={`Código de error: ${JSON.stringify(response)}`} />
					</React.Fragment>);
		} 
    };

    return (<div>{renderAll()}</div>);
};