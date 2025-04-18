
import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { purpleTheme } from './';

export const AppTheme = ({ children }) => {
    return (
        <ThemeProvider theme={ purpleTheme }>
            <CssBaseline />
            {children}

        </ThemeProvider>
    )
}
