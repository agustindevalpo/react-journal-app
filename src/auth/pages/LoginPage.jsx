import { useDispatch } from 'react-redux'
import { Link as RouterLink } from 'react-router'
import React from 'react'
import { Grid, TextField, Typography, Button, Link } from '@mui/material'
import { Google } from '@mui/icons-material'
import { AuthLayout } from '../layouts/AuthLayout'
import { useForm } from '../../hooks'

import { checkingAutentication, startGoogleSigIn } from '../../store/auth'

export const LoginPage = () => {

  const dispatch = useDispatch();

  const { email , password , onInputChange} = useForm({
      email: 'agustin.romero@devalpo.cl',
      password: '123456'
  });

  const onSubmit = ( event )=>{
     event.preventDefault();
     dispatch( checkingAutentication() );
     console.log( email , password );

  }

  const onGoogleSigIn = () =>{
    dispatch( startGoogleSigIn() );
    console.log("Login con Google");
  }

  return (

    <AuthLayout title='Login'>

      <form onSubmit={ onSubmit }>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name='email'
              value={ email }
              onChange={ onInputChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name='password'
              value={ password }
              onChange={ onInputChange}
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
                  onClick={ onGoogleSigIn }
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
