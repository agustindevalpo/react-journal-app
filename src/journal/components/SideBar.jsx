import { TurnedInNot } from '@mui/icons-material';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Divider } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

export const SideBar = ({ drawerWidth = 240, mobileOpen, handleDrawerToggle }) => {

  const { displayName } = useSelector( state => state.auth );
  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth 
          },
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            { displayName }
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {['Enero', 'Febrero', 'Marzo', 'Abril'].map((text) => (
            <React.Fragment key={text}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>
                  <ListItemText 
                    primary={text}
                    secondary="Nulla facilisi. Fusce lacinia laoreet..."
                    secondaryTypographyProps={{ noWrap: true }}
                  />
                </ListItemButton>
              </ListItem>
              <Divider variant="inset" component="div" />
            </React.Fragment>
          ))}
        </List>
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { 
            boxSizing: 'border-box', 
            width: drawerWidth 
          },
        }}
        open
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            Agustín Romero
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {['Enero', 'Febrero', 'Marzo', 'Abril'].map((text) => (
            <React.Fragment key={text}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <TurnedInNot />
                  </ListItemIcon>
                  <ListItemText 
                    primary={text}
                    secondary="Nulla facilisi. Fusce lacinia laoreet..."
                    secondaryTypographyProps={{ noWrap: true }}
                  />
                </ListItemButton>
              </ListItem>
              <Divider variant="inset" component="div" />
            </React.Fragment>
          ))}
        </List>
      </Drawer>
    </>
  );
};