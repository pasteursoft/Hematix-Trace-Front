import React from 'react';
import ConfigurationCard from '../../Components/configurationCard'
import MainLayout from '../../Components/layout/mainLayout';
import queryString from 'query-string';

export default ({location, history}) => {

	return (
		<MainLayout location={location} history={history}>
			<ConfigurationCard />
		</MainLayout>
	);
};