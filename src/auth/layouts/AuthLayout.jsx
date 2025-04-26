import { ChildCare } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'

export const AuthLayout = ({ children, title='' }) => {
    return (
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
                className='box-shadow'
                sx={{
                    backgroundColor: 'white',
                    padding: 3,
                    borderRadius: 2,
                    width: { xs: '100%', sm: '600px' , md: '450px'}
                }}
            >
                <Typography variant='h5' sx={{ mb: 3, textAlign: 'center' }}>{ title }</Typography>

                {/*  Children */}

                { children }


            </Grid>

        </Grid>
    )
}
