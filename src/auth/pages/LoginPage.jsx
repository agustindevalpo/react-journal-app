import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router';
import { Grid, TextField, Typography, Button, Link, Alert } from '@mui/material';
import { Google } from '@mui/icons-material';
import { useForm } from '../../hooks';
import { AuthLayout } from '../layouts/AuthLayout';
import { startGoogleSigIn, startLoginWithEmailPassword } from '../../store/auth';


const formData = {
  email: '',
  password: ''
}

export const LoginPage = () => {
  const { status, errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const isChecking = useMemo(() => status === 'checking', [status]);

  const { email, password, onInputChange } = useForm(formData);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSigIn = () => {
    dispatch(startGoogleSigIn());
  };

  return (
    <AuthLayout title='Login'>
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container spacing={2} direction="column">
          {errorMessage && (
            <Grid item xs={12}>
              <Alert severity="error">{errorMessage}</Alert>
            </Grid>
          )}

          <Grid item xs={12}>
            <TextField
              label="Correo"
              type="email"
              placeholder="correo@google.com"
              fullWidth
              name='email'
              value={email}
              onChange={onInputChange}
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
                  disabled={isChecking}
                  variant="contained"
                  fullWidth
                  type="submit"
                  size="large"
                >
                  {isChecking ? 'Cargando...' : 'Login'}
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  disabled={isChecking}
                  variant="outlined"
                  fullWidth
                  size="large"
                  onClick={onGoogleSigIn}
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
  );
};