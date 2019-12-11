import React from 'react';
import Logo from '../../assets/img/LogoHematixColor.png';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import classes from './productLogo.module.css';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
		zIndexProper: {
			zIndex: drawerZIndex => drawerZIndex + 1,
		}, 
	},
);
 
export default ({drawerZIndex}) => {
	const zIndex = useStyles(drawerZIndex);
	
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [logo] = React.useState(Logo);

	const mouseOverLogo = event => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};
	
	const mouseOutLogo = event => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
  	const id = open ? 'simple-popper' : undefined;

	return (
		<div>
			<img className={[classes.logo]} src={logo} alt="Hematix" onMouseOver={mouseOverLogo} 
				onMouseOut={mouseOutLogo} />
			<Popper id={id} open={open} anchorEl={anchorEl} className={zIndex.zIndexProper} transition>
				{({ TransitionProps }) => (
				<Fade {...TransitionProps} timeout={200} >
					<Paper square={false} elevation={1} className={[classes.speech_bubble_content, classes.speech_bubble]}>
						<Typography variant="h5">{process.env.REACT_APP_NAME}</Typography>
						<Typography variant="button">{process.env.REACT_APP_VERSION_NAME}</Typography> 
						<Typography variant="body2">{process.env.REACT_APP_VERSION}</Typography>
						<Typography variant="caption">{process.env.REACT_APP_COMPANY}</Typography>
					</Paper>
				</Fade>
				)}
			</Popper>
		</div>
	);
};

