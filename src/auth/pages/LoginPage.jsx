import React from 'react'
import { Link as RouterLink } from 'react-router'
import { Grid, TextField, Typography, Button, Link } from '@mui/material'
import { Google } from '@mui/icons-material'
import { AuthLayout } from '../layouts/AuthLayout'

export const LoginPage = () => {
  return (

    <AuthLayout title='Login'>

      <form>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
            />
          </Grid>


          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              sx={{
                flexDirection: {
                  xs: 'column',
                  sm: 'row',
                },
              }}
            >
              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  fullWidth
                  type="submit"
                  size="large"
                >
                  Login
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  size="large"
                >
                  <Google />
                  <Typography sx={{ ml: 1 }}>Google</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent='end'>
            <Link component={RouterLink} color='inherit' to="/auth/register">
              Crear una cuenta
            </Link>

          </Grid>

        </Grid>
      </form>

    </AuthLayout>



  )
}
