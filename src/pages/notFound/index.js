import React from '../../../node_modules/react';
import Typography from '../../../node_modules/@material-ui/core/Typography'
import MainLayout from '../../components/layout/mainLayout';

export default ({location, history}) => ( 	
	<MainLayout location={location} history={history}>
		<Typography variant='h1'>Error 404</Typography>
	</MainLayout>
	
);