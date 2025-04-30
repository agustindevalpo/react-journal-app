import React from 'react';
import { Box, Drawer, List, Toolbar, Typography, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { SideBarItem } from './SideBarItem';
import logo from '../../assets/logo_azul.png'; // Asegúrate que esta ruta es correcta

export const SideBar = ({ drawerWidth = 240, mobileOpen, handleDrawerToggle }) => {
  const { displayName } = useSelector(state => state.auth);
  const { notes } = useSelector(state => state.journal);

  return (
    <>
      {/* Drawer para móviles */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            display: 'flex',
            flexDirection: 'column'
          },
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />
        
        {/* Lista scrollable */}
        <Box sx={{ 
          flex: 1, 
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '0.4em',
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
          }
        }}>
          <List>
            {notes?.map((note) => (
              note && note.id && <SideBarItem key={note.id} note={note} />
            ))}
          </List>
        </Box>
        
        {/* Logo en la parte inferior - Versión móvil */}
        <Box sx={{ 
          p: 2,
          textAlign: 'center',
          borderTop: '1px solid rgba(0, 0, 0, 0.12)'
        }}>
          <img 
            src={logo}  
            alt="Company Logo" 
            style={{ 
              maxWidth: '80%',
              maxHeight: '60px',
              objectFit: 'contain'
            }} 
          />
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            © {new Date().getFullYear()} Todos los derechos reservados
          </Typography>
        </Box>
      </Drawer>

      {/* Drawer permanente para desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            display: 'flex',
            flexDirection: 'column'
          },
        }}
        open
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />
        
        {/* Lista scrollable */}
        <Box sx={{ 
          flex: 1, 
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '0.4em',
          },
          '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
          }
        }}>
          <List>
            {notes.map((note) => (
              <SideBarItem key={note.id} note={note} />
            ))}
          </List>
        </Box>
        
        {/* Logo en la parte inferior - Versión desktop */}
        <Box sx={{ 
          p: 2,
          textAlign: 'center',
          borderTop: '1px solid rgba(0, 0, 0, 0.12)'
        }}>
          <img 
            src={logo} 
            alt="Company Logo" 
            style={{ 
              maxWidth: '80%',
              maxHeight: '60px',
              objectFit: 'contain'
            }} 
          />
          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
            © {new Date().getFullYear()} Todos los derechos reservados
          </Typography>
        </Box>
      </Drawer>
    </>
  );
};