import React from "react";

import Logo from "../../../assets/img/LogoHematixColor.png";
import LogoBlanco from "../../../assets/img/LogoClienteBlanco.png";
import classes from "./Logo.module.css";

const logo = props => {
	let logoTipo = Logo;
	if (props.type === "white") {
		logoTipo = LogoBlanco;
	}

	return <img className={classes.Logo} src={logoTipo} alt="Hematix" />;
};

export default logo;
