import React from 'react';
import Typography from '@material-ui/core/Typography'
import MainLayout from '../../components/layout/mainLayout';

export default ({location, history}) => ( 	
	<MainLayout location={location} history={history}>
		<Typography variant='h1'>Renuncia de resposabilidad</Typography>
	</MainLayout>
);