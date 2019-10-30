import React, { useEffect } from '../../../node_modules/react';
import {Typography, Container, Grid, makeStyles} from '../../../node_modules/@material-ui/core';
import MainLayout from '../../components/layout/mainLayout';
import { useDispatch, useSelector } from 'react-redux';

import { getMeasurementsData } from '../../redux/actions/getMeasurementsData';

//import ConfiguracionHielera from "./Conteiners/ConfiguracionHielera/ConfiguracionHielera";

const useStyles = makeStyles({
	rootTitles: {
		paddingTop: 10,
		paddingBottom: 10,
	},
});

export default ({location, history}) => {

	const dispatch = useDispatch();
	const classes = useStyles();
	const resultz = useSelector(state => {
		console.log(state);
	});


	useEffect(() => {
		dispatch(getMeasurementsData({mac: "00-00-00-00-00-00"}));
	});
	 
	return (
		<MainLayout location={location} history={history}>
			{/* Traspasos */}
			<Grid className={classes.rootTitles} container>
				<Grid>
					<Typography variant='h2'>Home</Typography>
				</Grid>
			</Grid>

			{/* Traspasos */}
			<Grid className={classes.rootTitles} container>
				<Grid>
					<Typography variant='h3'>Traspasos</Typography>
				</Grid>
			</Grid>
			
			{/* Contenedores */}
			<Grid className={classes.rootTitles} container>
				<Grid>
					<Typography variant='h3'>Contenedores</Typography>
				</Grid>
			</Grid>

		</MainLayout>);
};