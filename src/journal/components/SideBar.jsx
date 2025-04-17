import { TurnedInNot } from '@mui/icons-material';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Divider } from '@mui/material';
import React from 'react';

export const SideBar = ({ drawerWidth = 240 }) => {
  return (
    <Box
      component='nav'
      sx={{ 
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 }
      }}
    >
      <Drawer
        variant='permanent'
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth,
            overflow: 'hidden'
          }
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            Agustín Romero
          </Typography>
        </Toolbar>
        
        <Divider />
        
        <List sx={{ overflow: 'auto', height: 'calc(100vh - 64px)' }}>
          {['Enero', 'Febrero', 'Marzo', 'Abril'].map((text) => (
            <React.Fragment key={text}>
              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton sx={{
                  px: 2,
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)'
                  }
                }}>
                  <ListItemIcon sx={{ minWidth: '40px' }}>
                    <TurnedInNot />
                  </ListItemIcon>
                  <Box sx={{ overflow: 'hidden' }}>
                    <ListItemText 
                      primary={text} 
                      primaryTypographyProps={{ 
                        noWrap: true,
                        fontWeight: 'medium'
                      }} 
                    />
                    <ListItemText 
                      secondary="Nulla facilisi. Fusce lacinia laoreet nisi eu aliquet..."
                      secondaryTypographyProps={{ 
                        noWrap: true,
                        variant: 'body2',
                        color: 'text.secondary'
                      }}
                      sx={{ mt: 0.5 }}
                    />
                  </Box>
                </ListItemButton>
              </ListItem>
              <Divider variant="inset" component="div" /> {/* Cambiado a div */}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};