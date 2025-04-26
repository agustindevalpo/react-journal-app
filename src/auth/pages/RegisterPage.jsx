import React, { useMemo, useState } from 'react'
import { Link as RouterLink } from 'react-router'
import { Grid, TextField, Typography, Button, Link, Alert } from '@mui/material'
import { AuthLayout } from '../layouts/AuthLayout'
import { Password } from '@mui/icons-material'
import { useForm } from '../../hooks'
import { useDispatch, useSelector } from 'react-redux'
import { startCreateRegisterUser } from '../../store/auth/thunks'

const formData = {
  email: 'agustin.romero@devalpo.cl',
  password: '123456',
  displayName: 'Agustín Romero'
}

const formValidations = {
  email: [(value) => value.includes('@'), 'El correo debe tener un @'],
  password: [(value) => value.length >= 6, 'El password debe tener más de 6 caracteres'], // Corregido length
  displayName: [(value) => value.length >= 1, 'El nombre es obligatorio'], // Corregido length
};

export const RegisterPage = () => {

  const dispatch = useDispatch();
  const [formSubmited, setFormSubmited] = useState(false);

  const { status, errorMessage } = useSelector(state => state.auth);
  const isChekingAuthentication = useMemo(() => status === 'cheking', [status]);

  const { displayName, email, password, onInputChange, formState, isFormValid,
    displayNameValid, emailValid, passwordValid } = useForm(formData, formValidations);


  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmited(true);
    if (!isFormValid) return;
    dispatch(startCreateRegisterUser(formState));
  }

  return (

    <AuthLayout title='Crear Cuenta'>
      <h1>FormValid: {isFormValid ? 'válido' : 'incorrecto'}</h1>

      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container spacing={2} direction="column">
          <Grid item xs={12}>
            <TextField
              label="Nombre Completo"
              type="text"
              placeholder="Agustín Romero"
              fullWidth
              name='displayName'
              value={displayName}
              onChange={onInputChange}
              error={!!displayNameValid && formSubmited}
              helperText={displayNameValid}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@gmail.com"
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && formSubmited}
              helperText={emailValid}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
              name='password'
              value={password}
              onChange={onInputChange}
              error={!!passwordValid && formSubmited}
              helperText={passwordValid}
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

              <Grid 
                 item xs={12} 
                 sm={6}
                 display={ !!errorMessage ? '' : 'none'}>
                <Alert severity='error'>
                  {errorMessage}
                </Alert>
              </Grid>


              <Grid item xs={12} sm={6}>
                <Button
                  disabled={isChekingAuthentication}
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
            <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color='inherit' to="/auth/login">
              Ingresar
            </Link>

          </Grid>

        </Grid>
      </form>

    </AuthLayout>



  )
}
