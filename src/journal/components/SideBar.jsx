import { TurnedInNot } from '@mui/icons-material';
import { Box, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, Divider } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { SideBarItem } from './SideBarItem';

export const SideBar = ({ drawerWidth = 240, mobileOpen, handleDrawerToggle }) => {

  const { displayName } = useSelector(state => state.auth);
  const { notes } = useSelector(state => state.journal);

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
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {notes?.map((note) => (
            note && note.id && <SideBarItem key={note.id} note={note} />
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
            {displayName}
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {notes.map((note) => (
            <SideBarItem key={note.id} note={note} />
          ))}
        </List>
      </Drawer>
    </>
  );
};