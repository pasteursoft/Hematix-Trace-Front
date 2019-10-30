import React from "../../../node_modules/react";
import AppBar from "../../../node_modules/@material-ui/core/AppBar";
import { makeStyles } from "../../../node_modules/@material-ui/core/styles";
import Toolbar from "../../../node_modules/@material-ui/core/Toolbar";
import Button from "../../../node_modules/@material-ui/core/Button";
import IconButton from "../../../node_modules/@material-ui/core/IconButton";
import MenuItem from "../../../node_modules/@material-ui/core/MenuItem";
import Menu from "../../../node_modules/@material-ui/core/Menu";
import ProductLogo from "../ui/productLogo";
import MoreIcon from "../../../node_modules/@material-ui/icons/MoreVert";

const useStyles = makeStyles(theme => ({
	footerBar: {
		top: "auto",
		bottom: 0,
		right:0,
		color: "black",
		boxShadow: "none",
	},
	grow: {
		flexGrow: 1
	},
	footer: {
		borderTop: "1px solid #eee",
	},
	title: {
		paddingRight: "40px",
		paddingLeft: "40px",
		fontWeight: "normal",
	},
	sectionDesktop: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},
	},
	sectionMobile: {
		display: "flex",
		[theme.breakpoints.up("md")]: {
			display: "none",
		},
	}
}));

export default ({location, history, drawerStatus, drawerZIndex}) => {

	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
	const [helpButtonDisabled] = React.useState(
		location.pathname === '/help'
	);
	const [termsConditionsButtonDisabled] = React.useState(
		location.pathname === '/termsConditions'
	);
	const [noticePrivacityButtonDisabled] = React.useState(
		location.pathname === '/noticePrivacity'
	);
	const [disclaimerButtonDisabled] = React.useState(
		location.pathname === '/disclaimer'
	);

	const classes = useStyles();

	const mobileMenuId = "primary-search-account-menu-mobile";
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleMobileMenuOpen = event => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = event => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuHelp = event => {
		history.push('/help');
	};

	const handleMenuTermsAndConditions = event => {
		history.push('/termsConditions');
	};

	const handleMenuNoticePrivacity = event => {
		history.push('/noticePrivacity');
	};

	const handleMenuDisclaimer = event => {
		history.push('/disclaimer');
	};

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
			<MenuItem selected={location.pathname === '/help'} onClick={handleMenuHelp} 
				disabled={helpButtonDisabled}>
				Ayuda
			</MenuItem>
			<MenuItem selected={location.pathname === '/termsConditions'}  onClick={handleMenuTermsAndConditions} 
				disabled={termsConditionsButtonDisabled}>
				Términos y condiciones
			</MenuItem>
			<MenuItem selected={location.pathname === '/noticePrivacity'} onClick={handleMenuNoticePrivacity} 
				disabled={noticePrivacityButtonDisabled}>
				Aviso de privacidad
			</MenuItem >
			<MenuItem selected={location.pathname === '/disclaimer'} onClick={handleMenuDisclaimer} 
				disabled={disclaimerButtonDisabled}>
				Renuncia de responsabilidad
			</MenuItem>
		</Menu>
	);
	return (
		<React.Fragment>
			<AppBar position="fixed" className={[classes.footerBar, drawerStatus]}>
				<Toolbar className={classes.footer}>
					<ProductLogo drawerZIndex={drawerZIndex} />
					<div className={classes.grow}>
						<div className={classes.sectionDesktop}>
							<div className={classes.grow} />
							<Button color="inherit" className={classes.title} onClick={handleMenuHelp} 
								disabled={helpButtonDisabled} >
								Ayuda
							</Button>
							<Button color="inherit" className={classes.title} onClick={handleMenuTermsAndConditions} 
								disabled={termsConditionsButtonDisabled}>
								Términos y condiciones
							</Button>
							<Button color="inherit" className={classes.title} onClick={handleMenuNoticePrivacity} 
								disabled={noticePrivacityButtonDisabled}>
								Aviso de privacidad
							</Button>
							<Button color="inherit" className={classes.title} onClick={handleMenuDisclaimer} 
								disabled={disclaimerButtonDisabled}>
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