import React from '../../../node_modules/react';
import { Typography, 
	Grid, 
	makeStyles } from '../../../node_modules/@material-ui/core';
import MainLayout from '../../components/layout/mainLayout';
import RouteMeasurementData from '../../components/routeMeasurementData';
import queryString from 'query-string';

const useStyles = makeStyles({
	rootTitles: {
		width: '100%',
		paddingTop: 10,
		paddingBottom: 10,
	}
});

export default ({location, history, ...props}) => {
	const classes = useStyles();
	const queryParameters = queryString.parse(location.search);
	
	return ( 		
		<MainLayout location={location} history={history}>
			<Grid className={classes.rootTitles} container>
				<Grid item>
					<Typography variant='h4'>Lecturas de los contenedores</Typography>
				</Grid>
			</Grid>
			<RouteMeasurementData location={location} params={queryParameters} />
		</MainLayout>
	);
}