
import { StarOutline, StartOutlined, StartRounded } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import React from 'react'

export const NothingSelectedView = () => {
    return (
        <Grid
            className='animate__animated animate__fadeIn animate__faster'
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: 'calc(100vh - 110px)', backgroundColor: 'primary.main' }}
        >

            <Grid item xs={ 12 }>
               <StarOutline sx= {{ fontSize: 100 , color: 'custom.orange'}}/>
            </Grid>

            <Grid item xs={ 12 }>
               <Typography variant='h5' color='white'>Selecciona o crea una entrada </Typography>  
            </Grid>

        </Grid>
    )
}
