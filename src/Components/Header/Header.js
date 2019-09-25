import React from "react";

import { makeStyles } from "@material-ui/core/styles";

//Componentes
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Logo from "../UI/Logo/Logo";

const useStyles = makeStyles(theme => ({
	root: {
		boxShadow: "none"
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	},
	nav: {
		backgroundColor: "#A21F3B"
	}
}));

function Header() {
	const classes = useStyles();
	return (
		<AppBar position="static" className={classes.root}>
			<Toolbar className={classes.nav}>
				<Logo type="white" />
			</Toolbar>
		</AppBar>
	);
}

export default Header;
