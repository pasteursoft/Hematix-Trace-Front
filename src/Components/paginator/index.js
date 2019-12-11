/*
 * MedicoSoft (c) 2019
 * Made under Proprietary license
 */
import React, { useState } from '../../../node_modules/react';
import {Tooltip, IconButton, Card, Grid, makeStyles } from '../../../node_modules/@material-ui/core';
import queryString from 'query-string';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import LastPageIcon from '@material-ui/icons/LastPage';

const useStyles = makeStyles({
    gridRoot: {
        display: 'flex',
        width: '100%',
        padding: '25px',
    },
    cardPage: {
        padding: '15px',
        margin: '5px',
        fontSize: '1.2em',
        fontWeight: 'bolder',
    }

});

export default ({...props}) => {
    
    const classes = useStyles();
    const [nextParams] = useState((props.next) ? queryString.parse(props.next.split('?')[1]) : null);
    const [previousParams] = useState((props.previous) ? queryString.parse(props.previous.split('?')[1]) : null);
    const [currentPage] = useState((props.currentPage) ? props.currentPage : null);
    const [lastPage] = useState((props.lastPage) ? props.lastPage : null);
    const [history] = useState(props.history);
    const [location] = useState(props.location);

    /*
        El paginaodr será simple en que págína esta siguientem anterior, ultima y primera
        si esta en la utlima o en la primera que no aparazcan esos botones

        "count": 1,
        "currentPage": 1,
        "lastPage": 1,
        "next": null,
        "previous": null,
    */

    const handleClickEvent = (params) => {
        return (
            e => {
                history.push(`/?${queryString.stringify(params)}`, {lastDeviceStatusBulkData: null});
                window.location.reload(true);
            }
        );
    };

    const buttonFirst = () => {
        return (
            <Tooltip title={"Primera"}>
                <IconButton disabled={(currentPage <= 1  || (currentPage - 1) <= 1 )} onClick={handleClickEvent(2)}><FirstPageIcon /></IconButton>
            </Tooltip>);
    };

    const buttonLast = () => {
        return (
            <Tooltip title={"Última"}>
                <IconButton disabled={(currentPage >= lastPage || (currentPage + 1) >= lastPage )} onClick={handleClickEvent(2)}><LastPageIcon /></IconButton>
            </Tooltip>);
    };
        
    const buttonNext = () => {
        return (
            <Tooltip title={"Siguiente"}>
                <IconButton disabled={(currentPage >= lastPage)} onClick={handleClickEvent(nextParams)}><ChevronRightIcon /></IconButton>
            </Tooltip>);
    };

    const buttonPrevious = () => {
        return (
            <Tooltip title={"Anterior"}>
                <IconButton disabled={(currentPage <= 1)} onClick={handleClickEvent(previousParams)}><ChevronLeftIcon /></IconButton>
            </Tooltip>);
    };

    return (
        <React.Fragment>
            <Grid direction="row" justify="center" alignItems="center" className={classes.gridRoot} container>
                <Grid item>
                    {buttonFirst()}
                </Grid>
                <Grid item>
                    {buttonPrevious()}
                </Grid>
                <Grid item>
                    <Card className={classes.cardPage}>
                        {currentPage}
                    </Card>
                </Grid>
                <Grid item>
                    {buttonNext()}
                </Grid>
                <Grid item>
                    {buttonLast()}
                </Grid>
            </Grid>
        </React.Fragment>
    );
}