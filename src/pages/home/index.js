/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */
import React, { useEffect, useState } from '../../../node_modules/react';
import {Typography, CircularProgress, Grid, makeStyles} from '../../../node_modules/@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import queryString from 'query-string';
import Paginator from '../../components/paginator';
import MainLayout from '../../components/layout/mainLayout';
import ContainerLastStatusCard from '../../components/cards/containerLastStatusCard'; 
import { LastDeviceStatusBulkData } from '../../redux/actions/LastDeviceStatusBulk';
import { isLastDeviceStatusBulkLoading,
		lastDeviceStatusBulkResult,
		lastDeviceStatusBulkError,
		lastDeviceStatusBulkResponse
	 } from '../../redux/selectors';
import Alert from '../../components/alert';
import { MESSAGE_TYPE } from '../../components/alert/messageType';

const useStyles = makeStyles({
	rootTitles: {
		paddingTop: 10,
		paddingBottom: 10,
	},
	flexRootStatus: {
		display: 'flex',
		width: '100%',
	},
	rootContainer: {
		width: '100%',
		display: 'fex',
		alignItems: "center",
		justifyContent: "center",
	}
});

export default ({location, history}) => {

	const dispatch = useDispatch();
	const classes = useStyles();
	const queryParameters = queryString.parse(location.search);
	const lastDeviceStatusBulkData = useSelector(state => lastDeviceStatusBulkResult(state));
	const isLoadingLastDeviceStatusBulk = useSelector(state => isLastDeviceStatusBulkLoading(state));
	const lastDeviceStatusBulkCallError = useSelector(state => lastDeviceStatusBulkError(state));
	const lastDeviceStatusBulkResponses = useSelector(state => lastDeviceStatusBulkResponse(state));

	const configurationDevicesData = () => {
		if (lastDeviceStatusBulkData && !lastDeviceStatusBulkCallError) {
			return (
			<React.Fragment>
				<Grid className={classes.flexRootStatus} container>
					{lastDeviceStatusBulkData.resultsBulk.map((result, index) => {
						return (
						<Grid className={classes.flexRootStatus} spacing={2} xs={12} sm={12}  md={12} lg={4} xl={4}>
							<ContainerLastStatusCard index={index} cardData={result} history={history} location={location}></ContainerLastStatusCard>
						</Grid>
						);
					})}
				</Grid>
				<Grid className={classes.flexRootStatus} spacing={2} xs={12} sm={12}  md={12} lg={12} xl={12} item>
					<Paginator next={lastDeviceStatusBulkData.configurationResults.data.next} 
								previous={lastDeviceStatusBulkData.configurationResults.data.previous} 
								currentPage={lastDeviceStatusBulkData.configurationResults.data.currentPage}
								lastPage={lastDeviceStatusBulkData.configurationResults.data.lastPage} 
								history={history}
								location={location}/>
				</Grid>
			</React.Fragment>
			);
		} else if (isLoadingLastDeviceStatusBulk) {
			return (
				<Grid container direction="row" justify="center" alignItems="center" > 
				<Grid item>
					<CircularProgress size={100} color="secondary"/>
				</Grid>
			</Grid>
			); 
		} else {
			return (<React.Fragment>
						<Alert messageType={MESSAGE_TYPE.ERROR} message={`Código de error: ${JSON.stringify(lastDeviceStatusBulkResponses)}`} />
					</React.Fragment>);
		} 
	}	

	useEffect(() => {
		const payload = {
			uriParameters: {
			},
			queryParams: queryParameters
		}
		payload.queryParams.pagination = 3;
		if (!lastDeviceStatusBulkData && !lastDeviceStatusBulkCallError) {
			dispatch(LastDeviceStatusBulkData(payload));
		}
	});
	 
	return (
		<MainLayout location={location} history={history}>
			<Grid className={classes.rootTitles} container>
				<Grid>
					<Typography variant='h4'>Último estado de los contenedores</Typography>
				</Grid>
			</Grid>
			{configurationDevicesData()}
		</MainLayout>);
};