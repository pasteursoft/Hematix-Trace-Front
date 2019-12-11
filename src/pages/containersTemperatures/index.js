/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */
import React from '../../../node_modules/react';
import Typography from '../../../node_modules/@material-ui/core/Typography'
import MainLayout from '../../Components/layout/mainLayout';
import queryString from 'query-string';

export default ({location, history}) => {
	return (
		<MainLayout location={location} history={history}>
			<Typography variant='h1'>Config container { queryString.parse(location.search).macAddress}</Typography>
		</MainLayout> 
	);
};