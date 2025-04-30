import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SaveOutlined, CloudUploadOutlined, AddPhotoAlternateOutlined, DeleteOutlineOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography, IconButton, Tooltip, Box, CircularProgress } from '@mui/material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { ImageGallery } from '../components';
import { startDeletingNote, startSaveNote, startUploadingFiles } from '../../store/journal/thunks';
import { useNoteForm } from '../../hooks/';

export const NoteView = () => {
  const dispatch = useDispatch();
  const { active: note, messageSaved, isSaving } = useSelector(state => state.journal);
  const fileInputRef = useRef();
  const [isUploading, setIsUploading] = useState(false);

  const memoizedValidations = useMemo(() => ({
    title: [(value) => value.length > 0, 'El título es obligatorio'],
    body: [(value) => value.length > 0, 'El contenido no puede estar vacío'],
  }), []);

  useEffect(() => {
    console.log('Estado Redux actualizado:', { 
        isSaving, 
        messageSaved,
        note: note ? { id: note.id, title: note.title } : null 
    });
}, [isSaving, messageSaved, note]);

  const {
    title,
    body,
    date,
    onInputChange,
    isFormValid,
    titleValid,
    bodyValid
  } = useNoteForm(note || { title: '', body: '', date: new Date().getTime() }, memoizedValidations);

  const dateString = useMemo(() => {
    return new Date(date).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }, [date]);

  const onSaveNote = async() => {
    try {
      const success = await dispatch(startSaveNote());
      if (success) {
          console.log('Guardado exitoso, estado debería estar actualizado');
      }
  } catch (error) {
      console.error('Error al guardar:', error);
      Swal.fire('Error', 'No se pudo guardar la nota', 'error');
  }
  };

  const onDeleteNote = () => {
    dispatch(startDeletingNote());
  }

  const onInputFileChange = async ({ target }) => {
    if (!target.files || target.files.length === 0) return;

    try {
        setIsUploading(true);
        const uploadedUrls = await dispatch(startUploadingFiles(target.files));
        
        if (uploadedUrls?.length > 0) {
            Swal.fire('Éxito', `${uploadedUrls.length} imagen(es) subida(s) correctamente`, 'success');
        }
    } catch (error) {
        Swal.fire('Error', error.message || 'Error al subir imágenes', 'error');
    } finally {
        setIsUploading(false);
        target.value = '';
    }
};


  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success');
    }
  }, [messageSaved]);

  return (
    <Grid container direction="column" sx={{ mb: 1, position: 'relative' }}>
      {/* Cabecera con controles */}
      <Grid container item justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
        <Typography variant="h4" fontWeight="medium">
          {dateString}
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          {/* Input de archivo oculto */}
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            onChange={onInputFileChange}
            style={{ display: 'none' }}
          />

          {/* Botón de subida mejorado */}
          <Tooltip title="Subir imágenes">
            <Button
              component="label"
              variant="outlined"
              color="custom"
              startIcon={isUploading ? <CircularProgress size={20} /> : <CloudUploadOutlined />}
              disabled={isSaving || isUploading}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                minWidth: '120px'
              }}
            >
              {isUploading ? 'Subiendo...' : 'Subir'}
              <input
                type="file"
                hidden
                multiple
                onChange={onInputFileChange}
              />
            </Button>
          </Tooltip>

          {/* Botón de guardar */}
          <Button
            onClick={onSaveNote}
            color="primary"
            variant="contained"
            disabled={!isFormValid || isSaving }
            startIcon={isSaving ? <CircularProgress size={20} /> : <SaveOutlined />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              minWidth: '120px'
            }}
          >
            {isSaving ? 'Guardando...' : 'Guardar'}
          </Button>


          <Button
            onClick={() => {
              Swal.fire({
                title: '¿Eliminar esta nota?',
                text: "¡No podrás revertir esto!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Sí, borrar',
                cancelButtonText: 'Cancelar'
              }).then((result) => {
                if (result.isConfirmed) {
                  onDeleteNote();
                }
              });
            }}
            color="error"
            variant="outlined"
            disabled={isSaving}
            startIcon={<DeleteOutlineOutlined />}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              minWidth: '120px'
            }}
          >
            Eliminar
          </Button>

        </Box>
      </Grid>

      {/* Campos del formulario */}
      <Grid item xs={12} sx={{ mb: 2 }}>
        <TextField
          type="text"
          variant="outlined"
          fullWidth
          placeholder="Ingrese un título"
          label="Título"
          name="title"
          value={title}
          onChange={onInputChange}
          error={!!titleValid}
          helperText={titleValid}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2
            }
          }}
        />
      </Grid>

      <Grid item xs={12} sx={{ mb: 2 }}>
        <TextField
          type="text"
          variant="outlined"
          fullWidth
          multiline
          placeholder="¿Qué sucedió hoy?"
          minRows={5}
          name="body"
          value={body}
          onChange={onInputChange}
          error={!!bodyValid}
          helperText={bodyValid}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2
            }
          }}
        />
      </Grid>

      {/* Galería de imágenes */}
      <ImageGallery images={note?.imageUrls || []} />
    </Grid>
  );
};