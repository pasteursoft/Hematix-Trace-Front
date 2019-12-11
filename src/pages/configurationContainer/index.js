import React from 'react';
import ConfigurationCard from '../../components/configurationCard'
import MainLayout from '../../components/layout/mainLayout';
import queryString from 'query-string';

export default ({location, history}) => {

	return (
		<MainLayout location={location} history={history}>
			<ConfigurationCard />
		</MainLayout>
	);
};