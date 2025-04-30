export const fileUpload = async (file) => {
  if (!file || !(file instanceof File)) {
      throw new Error('Debe proporcionar un archivo válido');
  }

  // Validaciones adicionales
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_SIZE) {
      throw new Error('El archivo excede el tamaño máximo de 5MB');
  }

  const cloudUrl = 'https://api.cloudinary.com/v1_1/devalpo-react/upload';
  const formData = new FormData();
  formData.append('upload_preset', 'react-journal');
  formData.append('file', file);
  formData.append('timestamp', (Date.now() / 1000).toString());

  try {
      const response = await fetch(cloudUrl, {
          method: 'POST',
          body: formData
      });

      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Error al subir el archivo');
      }

      const data = await response.json();
      return data.secure_url;

  } catch (error) {
      console.error('Error en fileUpload:', error);
      throw new Error(`No se pudo subir el archivo: ${error.message}`);
  }
};