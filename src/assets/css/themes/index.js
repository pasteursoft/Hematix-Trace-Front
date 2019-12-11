//import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';

export const hematixTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#ffffff",
            light: '#ffffff',
            dark: '#cccccc',
            contrastText: '#000000',
        },
        secondary: {
            main: "#A21F3B",
            light: '#d85465',
            dark: '#6d0016',
            contrastText: '#ffffff',
        },
        text: {
            primary:"#000000",
            secondary: "rgba(0, 0, 0, 0.7)",
            disabled: "rgba(0, 0, 0, 0.5)",
            hint:"rgba(0, 0, 0, 0.5)",
        }
    }
});