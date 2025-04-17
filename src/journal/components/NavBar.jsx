import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography, Box } from '@mui/material';
import React from 'react';

export const NavBar = ({ drawerWidth = 240 }) => {
  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        zIndex: (theme) => theme.zIndex.drawer + 1 // Asegura que esté sobre el SideBar
      }}
    >
      <Toolbar>
        {/* Botón de menú para móviles */}
        <IconButton
          color='inherit'
          edge="start"
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuOutlined />
        </IconButton>

        {/* Título de la aplicación - crece para empujar el botón al final */}
        <Typography 
          variant='h6' 
          noWrap 
          component='div' 
          sx={{ flexGrow: 1 }} // Esto hace que ocupe todo el espacio disponible
        >
          Journal App
        </Typography>

        {/* Botón de logout al final */}
        <IconButton 
          color='error'
          sx={{ 
            p: 1,
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }
          }}
        >
          <LogoutOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};