import React from "react";

import { makeStyles } from "@material-ui/core/styles";

//Componentes
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Logo from "../UI/Logo/Logo";

//Iconos
import MoreIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles(theme => ({
	appBar: {
		top: "auto",
		bottom: 0,
		color: "black",
		boxShadow: "none"
	},
	grow: {
		flexGrow: 1
	},
	footer: {
		backgroundColor: "#fff",
		borderTop: "1px solid #eee"
	},
	title: {
		paddingRight: "40px",
		paddingLeft: "40px",
		fontWeight: "normal"
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex"
		}
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none"
		}
	}
}));

function Footer() {
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const classes = useStyles();
	const mobileMenuId = "primary-search-account-menu-mobile";
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	function handleMobileMenuOpen(event) {
		setMobileMoreAnchorEl(event.currentTarget);
	}

	function handleMobileMenuClose() {
		setMobileMoreAnchorEl(null);
	}

	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: "top", horizontal: "left" }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: "top", horizontal: "left" }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<Button color="inherit" onClick={handleMobileMenuClose}>
					Ayuda
				</Button>
			</MenuItem>
			<MenuItem>
				<Button color="inherit" onClick={handleMobileMenuClose}>
					Términos de uso
				</Button>
			</MenuItem>
			<MenuItem>
				<Button color="inherit" onClick={handleMobileMenuClose}>
					Aviso de privacidad
				</Button>
			</MenuItem>
			<MenuItem>
				<Button color="inherit" onClick={handleMobileMenuClose}>
					Renuncia de responsabilidad
				</Button>
			</MenuItem>
		</Menu>
	);

	return (
		<React.Fragment>
			<AppBar position="fixed" color="primary" className={classes.appBar}>
				<Toolbar className={classes.footer}>
					<Logo type="color" />

					<div className={classes.grow}>
						<div className={classes.sectionDesktop}>
							<div className={classes.grow} />
							<Button color="inherit" className={classes.title}>
								Ayuda
							</Button>
							<Button color="inherit" className={classes.title}>
								Términos de uso
							</Button>
							<Button color="inherit" className={classes.title}>
								Aviso de privacidad
							</Button>
							<Button color="inherit" className={classes.title}>
								Renuncia de responsabilidad
							</Button>
						</div>

						<div className={classes.sectionMobile}>
							<div className={classes.grow} />
							<IconButton
								aria-label="show more"
								aria-controls={mobileMenuId}
								aria-haspopup="true"
								onClick={handleMobileMenuOpen}
								color="inherit"
							>
								<MoreIcon />
							</IconButton>
						</div>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
		</React.Fragment>
	);
}

export default Footer;
