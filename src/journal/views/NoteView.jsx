import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { ImageGallery } from '../components';

export const NoteView = () => {
  return (
    <Grid container direction="column" sx={{ mb: 1 }}>
      {/* Fila superior con fecha y botón */}
      <Grid container item justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography fontSize={39} fontWeight="light">
          17 de abril, 2025
        </Typography>
        
        <Button 
          color="primary" 
          variant="contained"
          sx={{ 
            padding: '8px 16px',
            borderRadius: 2,
            textTransform: 'none',
            fontSize: '1rem'
          }}
        >
          <SaveOutlined sx={{ fontSize: 24, mr: 1 }} />
          Guardar
        </Button>
      </Grid>

      {/* Campos del formulario */}
      <Grid item xs={12} sx={{ mb: 2 }}>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Ingrese un título'
          label='Título'
          sx={{ 
            '& .MuiFilledInput-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              borderRadius: 1
            }
          }}
        />
      </Grid>

      <Grid item xs={12} sx={{ mb: 2 }}>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='¿Qué sucedió hoy?'
          minRows={5}
          sx={{ 
            '& .MuiFilledInput-root': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              borderRadius: 1
            }
          }}
        />
      </Grid>

      {/* Galería de imágenes */}
      <ImageGallery />
    </Grid>
  );
};