import React from '../../../node_modules/react';
import Typography from '../../../node_modules/@material-ui/core/Typography'
import MainLayout from '../../Components/layout/mainLayout';

export default ({location, history}) => ( 	
	<MainLayout location={location} history={history}>
		<Typography variant='h1'>Terminos y condiciones</Typography>
	</MainLayout>
	
);