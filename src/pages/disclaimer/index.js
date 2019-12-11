import React from '../../../node_modules/react';
import { Typography, Container } from '../../../node_modules/@material-ui/core'
import MainLayout from '../../Components/layout/mainLayout';

import Alert from '../../Components/alert';
import { MESSAGE_TYPE } from '../../Components/alert/messageType';

export default ({location, history}) => {
	return ( 	
		<MainLayout location={location} history={history}>
			<Typography variant='h1'>Renuncia de resposabilidad</Typography>
			<React.Fragment>
				<Container>
				<Alert messageType={MESSAGE_TYPE.ERROR} message={"ErrorErrorErrorErrorErrorErrorErrorErrorErrovrErrorErrorvErrovrErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErrorErro rErrorErrorErr orErrorErrorErrorEr rorErrorErrorErrorEr rorErrorErrorErrorErrorE rrorErrorErrorErrorEr rorErrorErrorError ErrorErrorError"}/>
				<Alert messageType={MESSAGE_TYPE.INFO} message={"Información"}/>
				<Alert messageType={MESSAGE_TYPE.CORRECT} message={"Correcto"}/>
				<Alert messageType={MESSAGE_TYPE.HELP} message={"Ayuda"}/>
				<Alert messageType={MESSAGE_TYPE.ALERT} message={"Alerta"}/>
				</Container>
			</React.Fragment>
		</MainLayout>
	);
};