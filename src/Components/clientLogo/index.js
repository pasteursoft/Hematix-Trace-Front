import React from 'react';
import Logo from '../../assets/img/LogoClienteBlanco.png';
import classes from './clientLogo.module.css';
 
export default () => {
	const [logo] = React.useState(Logo);
	return (
		<div>
			<img className={classes.logo} src={logo} alt="Hematix"/>
		</div>
	);
};