import React from 'react';
import clsx from 'clsx';
import {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Typography, 
	IconButton,
	Drawer, 
	AppBar, 
	Toolbar, 
	Divider, 
	CssBaseline, 
	List, 
	ListItemIcon,
	ListItem, 
	ListItemText,
	Tooltip} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ErrorIcon from '@material-ui/icons/Error';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'; 
import ChevronRightIcon from '@material-ui/icons/ChevronRight'; 
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import TimelineIcon from '@material-ui/icons/Timeline';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import MapIcon from '@material-ui/icons/Map';
import PeopleIcon from '@material-ui/icons/People';
import Footer from '../footer';
import ClientLogo from '../ui/clientLogo';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	growMenu: {
		flexGrow: 1,
	},
	headerMenu: {
		display: "none",
		[theme.breakpoints.up("md")]: {
			display: "flex",
		},	
	},
	buttonsHeaderMenu: {
		paddingLeft: "20px",
		paddingRight: "20px",
	},
	root: {
		boxShadow: "none",
		display: 'flex',	
	},
	title: {
		flexGrow: 1,
	},
	zIndexBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	appBar: {
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
	marginLeft: drawerWidth,
	width: `calc(100% - ${drawerWidth}px)`,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	  },
	  drawerClose: {
		transition: theme.transitions.create('width', {
		  easing: theme.transitions.easing.sharp,
		  duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
		  width: theme.spacing(9) + 1,
		},
	  },
	  toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
	  },
	  content: {
		flexGrow: 1,
		paddingLeft: theme.spacing(3),
		paddingrRigth: theme.spacing(0),
		marginBottom: "90px",
	  },
}));

export default ({props}) => {
	const mainMenu = [
		{key: 'HOME', value: 'Inicio', eventHandle: e => {props.history.push('/')} },
		{key: 'MOVEMENTS', value: 'Traspasos', eventHandle: e => {props.history.push('/movements')} },
		{key: 'MEASUREMENTS', value: 'Temperaturas', eventHandle: e => {props.history.push('/measurements')} },
		{key: 'LOCALIZATION', value: 'Localización', eventHandle: e => {props.history.push('/localization')} },
		{key: 'CONATINERS', value: 'Contenedores', eventHandle: e => {props.history.push('/containers')} }];
	const secondaryMenu = [{key: 'USERS', value: 'Usuarios', eventHandle: e => {props.history.push('/users')} }];
	const classes = useStyles();
	const theme = useTheme();
	const [menuOpen, setMenuOpen] = useState(false);

	const handleMenuOpen = e => {
		setMenuOpen(true);
	}
	
	const handleMenuClose = e => {
		setMenuOpen(false);
	}

	const renderMainMenu = (text) => { 
		switch(text) {
			case "HOME":
				return (<HomeIcon />);
			case "MOVEMENTS":
				return (<SwapHorizIcon />);
			case "MEASUREMENTS":
				return (<TimelineIcon />);
			case "LOCALIZATION":
					return (<MapIcon />);
			case "CONATINERS":
					return (<LocalShippingIcon />);
			case "USERS":
					return (<PeopleIcon />);
			default:
				return (<ErrorIcon />);
		}
	}

	const renderDivider = (menu) => {
		if (menu.length > 0) return (<Divider />);
		return null;
	}

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar color="secondary" position="fixed" 
				className={clsx(classes.appBar, classes.zIndexBar, {
				[classes.appBarShift]: menuOpen,
				})}>
				<Toolbar className={classes.nav}>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleMenuOpen}
						edge="start"
						className={clsx(classes.menuButton, {
						[classes.hide]: menuOpen,
						})}
					>
						<MenuIcon />
					</IconButton>
					<ClientLogo />
					<div className={classes.growMenu}>
						<div className={classes.headerMenu} >
							<div className={classes.growMenu} />
							<AccountCircleIcon fontSize="large" />
							<Typography variant="h5" >Usuario</Typography>
							<ExitToAppIcon fontSize="large" />
						</div>
					</div>
				</Toolbar>
			</AppBar>
			<Drawer 
				variant="permanent"
				className={clsx(classes.drawer, {
				[classes.drawerOpen]: menuOpen,
				[classes.drawerClose]: !menuOpen,
				})}
				classes={{
				paper: clsx({
					[classes.drawerOpen]: menuOpen,
					[classes.drawerClose]: !menuOpen,
				}),
				}}
				open={menuOpen}
			>
				<div className={classes.toolbar}>
				<IconButton onClick={handleMenuClose}>
					{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
				</IconButton>
				</div>
				<Divider />
				<List>
					{mainMenu.map(obj => (
						<ListItem button key={obj.value} onClick={obj.eventHandle}>
							<Tooltip title={!menuOpen ? obj.value : ""}>
									<ListItemIcon>{renderMainMenu(obj.key)}</ListItemIcon>
							</Tooltip>
							<ListItemText primary={obj.value} />
						</ListItem>
					))}
				</List>
				{renderDivider(secondaryMenu)}
				<List>
					{secondaryMenu.map(obj => (
							<ListItem button key={obj.value} onClick={obj.eventHandle}>
								<Tooltip title={!menuOpen ? obj.value : ""}>
										<ListItemIcon>{renderMainMenu(obj.key)}</ListItemIcon>
								</Tooltip>
								<ListItemText primary={obj.value} />
							</ListItem>
						))}
				</List>
				<div className={classes.toolbar} />
			</Drawer>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{props.children}	
				<Footer location={props.location} history={props.history} 
					drawerStatus={clsx(classes.appBar, classes.zIndexBar, {[classes.appBarShift]: menuOpen, })} 
					drawerZIndex = {theme.zIndex.drawer} />
			</main>
		</div>
	);
}