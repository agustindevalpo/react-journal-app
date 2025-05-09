
import { CircularProgress, Grid } from '@mui/material'
import React from 'react'

export const CheckingAuth = () => {
    return (

        <div>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
            >
                <Grid
                    item
                    direction='row'
                    justifyContent='center'
                >
                    <CircularProgress  color='warning'/>

                    
                </Grid>

            </Grid>
        </div>
    )
}
