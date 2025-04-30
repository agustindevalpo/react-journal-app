import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Typography, Skeleton, useMediaQuery, useTheme } from '@mui/material';

export const ImageGallery = ({ images = [], isLoading = false }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // Determinar columnas según el tamaño de pantalla
  const cols = isSmallScreen ? 2 : isMediumScreen ? 3 : 4;

  // Si está cargando, mostrar skeletons
  if (isLoading) {
    return (
      <ImageList sx={{ width: '100%', height: 450 }} cols={cols} rowHeight={200}>
        {[...Array(4)].map((_, index) => (
          <ImageListItem key={`skeleton-${index}`}>
            <Skeleton 
              variant="rectangular" 
              width="100%" 
              height={200}
              animation="wave"
            />
          </ImageListItem>
        ))}
      </ImageList>
    );
  }

  // Si no hay imágenes
  if (!images || images.length === 0) {
    return (
      <Typography 
        variant="body1" 
        color="textSecondary"
        sx={{ 
          textAlign: 'center', 
          mt: 2,
          fontStyle: 'italic'
        }}
      >
        No hay imágenes para mostrar
      </Typography>
    );
  }

  return (
    <ImageList 
      sx={{ 
        width: '100%', 
        height: 450,
        overflow: 'hidden'
      }} 
      cols={cols} 
      rowHeight={200}
      gap={8}
    >
      {images.map((imageUrl, index) => (
        <ImageListItem key={`${imageUrl}-${index}`}>
          <img
            src={imageUrl}
            srcSet={imageUrl}
            alt={`Imagen ${index + 1}`}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain', // Cambiado de 'cover' a 'contain'
              backgroundColor: '#f5f5f5',
              borderRadius: '8px',
              padding: '8px',
              boxSizing: 'border-box'
            }}
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
};