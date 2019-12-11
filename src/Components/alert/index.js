import React, { useState } from '../../../node_modules/react';
import { SnackbarContent, Grid, Typography, makeStyles, Divider } from '../../../node_modules/@material-ui/core';
import InfoIcon from '../../../node_modules/@material-ui/icons/Info';
import HelpIcon from '../../../node_modules/@material-ui/icons/Help';
import WarningIcon from '../../../node_modules/@material-ui/icons/Warning';
import ErrorIcon from '../../../node_modules/@material-ui/icons/Error';
import CheckCircleIcon from '../../../node_modules/@material-ui/icons/CheckCircle';
import { MESSAGE_TYPE } from './messageType';

const messageStyles = {
    padding: "5px",
    margin: "5px",
    border: "0px",
    boxShadow: 'none'
}

const messageContentStyles = {
    display: 'flex',
    paddingLeft: '5px',
    paddingRight: '5px',
    paddingTop: '5px',
    paddingBottom: '5px',
}

const useStyles = makeStyles({
    message: {},
    help: {
		backgroundColor: "rgba(63, 127, 191, 0.2)",
		color: 'rgb(63, 127, 191)',
		...messageStyles,
	},
	helpContent: {
        ...messageContentStyles,
	},
    info: {
		backgroundColor: "rgba(150, 150, 0, 0.2)",
		color: 'rgb(150, 150, 0)',
		...messageStyles,
	},
	infoContent: {
        ...messageContentStyles,
	},
    correct: {
		backgroundColor: "rgba(48, 115, 48, 0.2)",
		color: 'rgb(48, 115, 48)',
		...messageStyles,
	},
	correctContent: {
        ...messageContentStyles,
	},
    error: {
		backgroundColor: "rgba(191, 63, 63, 0.2)",
		color: 'rgb(191, 63, 63)',
		...messageStyles,
	},
	errorContent: {
        ...messageContentStyles,
	},
	warning: {
		backgroundColor: "rgba(200, 100, 0, 0.2)",
		color: 'rgb(200, 100, 0)',
		...messageStyles,
	},
	warningContent: {
        ...messageContentStyles,
	}
});

export default ({...props}) => {
    const classes = useStyles();
    const [message] = useState((props.message) ? props.message : "Vacío");
    const [messageType] = useState(() => {
        switch (props.messageType) {
            case MESSAGE_TYPE.ERROR:
                return MESSAGE_TYPE.ERROR;
            case MESSAGE_TYPE.INFO:
                return MESSAGE_TYPE.INFO;
            case MESSAGE_TYPE.ALERT:
                return MESSAGE_TYPE.ALERT;
            case MESSAGE_TYPE.HELP:
                return MESSAGE_TYPE.HELP;
            case MESSAGE_TYPE.CORRECT:
                return MESSAGE_TYPE.CORRECT;
            default:
                return MESSAGE_TYPE.ERROR;
        }
    });
    const [messageTitle] = useState(() => {
        switch (props.messageType) {
            case MESSAGE_TYPE.ERROR:
                return "¡Ups! Parece que algo salió mal";
            case MESSAGE_TYPE.INFO:
                return "Información";
            case MESSAGE_TYPE.ALERT:
                return "Alerta";
            case MESSAGE_TYPE.HELP:
                return "Esta información puede ser útil";
            case MESSAGE_TYPE.CORRECT:
                return "La operación se realizó correctamente";
            default:
                return "!Ups¡ Parece que algo salió mal";
        }
    });

    const prepareSnackBar = () => {
        let contentSnackBar = {
            style: {
                content: null,
                message: null
            },
            icon: null
        }
        switch (messageType) {
            case MESSAGE_TYPE.ERROR:
                contentSnackBar.style.content = classes.errorContent;
                contentSnackBar.style.message = classes.error;
                contentSnackBar.icon = <ErrorIcon fontSize='large' className={contentSnackBar.style.content}/>;
                return contentSnackBar;
            case MESSAGE_TYPE.INFO:
                contentSnackBar.style.content = classes.infoContent;
                contentSnackBar.style.message = classes.info;
                contentSnackBar.icon = <InfoIcon fontSize='large' className={contentSnackBar.style.content}/>;
                return contentSnackBar;
            case MESSAGE_TYPE.ALERT:
                contentSnackBar.style.content = classes.warningContent;
                contentSnackBar.style.message = classes.warning;
                contentSnackBar.icon = <WarningIcon fontSize='large' className={contentSnackBar.style.content}/>;
                return contentSnackBar;
            case MESSAGE_TYPE.HELP:
                contentSnackBar.style.content = classes.helpContent;
                contentSnackBar.style.message = classes.help;
                contentSnackBar.icon = <HelpIcon fontSize='large' className={contentSnackBar.style.content}/>;
                return contentSnackBar;
            case MESSAGE_TYPE.CORRECT:
                contentSnackBar.style.content = classes.correctContent;
                contentSnackBar.style.message = classes.correct;
                contentSnackBar.icon = <CheckCircleIcon fontSize='large' className={contentSnackBar.style.content}/>;
                return contentSnackBar;
            default:
                contentSnackBar.style.content = classes.errorContent;
                contentSnackBar.style.message = classes.error;
                contentSnackBar.icon = <ErrorIcon fontSize='large' className={contentSnackBar.style.content}/>;
                return contentSnackBar;
        }
    };

    const renderSnackBar = () => {
        const dataSnackBar = prepareSnackBar();
        return (
            <SnackbarContent
                role='alert'
                message={<React.Fragment>
                            <Grid container
                                direction="row"
                                justify="flex-start"
                                alignItems="center"> 
                                <Grid item>
                                    {dataSnackBar.icon}
                                </Grid>
                                <Grid item>
                                    <Typography className={dataSnackBar.style.content}>{messageTitle}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container
                                direction="row"
                                justify="flex-start"
                                alignItems="center"> 
                                <Grid item>
                                    <Typography className={dataSnackBar.style.content}>{message}</Typography>
                                </Grid>
                            </Grid>
                        </React.Fragment>}
                className={dataSnackBar.style.message}
            />
        );
    };
    
    return (<React.Fragment>{renderSnackBar()}</React.Fragment>);
}