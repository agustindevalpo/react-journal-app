import React from 'react'
import { Link as RouterLink } from 'react-router'
import { Grid, TextField, Typography, Button, Link } from '@mui/material'
import { Google } from '@mui/icons-material'
import { AuthLayout } from '../layouts/AuthLayout'

export const RegisterPage = () => {
  return (

    <AuthLayout title='Crear Cuenta'>

      <form>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <TextField
              label="Nombre Completo"
              type="text"
              placeholder="Agustín Romero"
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
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
                  Crear Cuenta
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid container direction="row" justifyContent='end'>
            <Typography sx={{ mr:1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
              Ingresar
            </Link>

          </Grid>

        </Grid>
      </form>

    </AuthLayout>



  )
}
