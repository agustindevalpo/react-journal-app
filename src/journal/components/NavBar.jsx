import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

export const NavBar = ({ drawerWidth, handleDrawerToggle }) => {
  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuOutlined />
        </IconButton>

        <Typography 
          variant='h6' 
          noWrap 
          component='div' 
          sx={{ flexGrow: 1 }}
        >
          Journal App
        </Typography>

        <IconButton color='error'>
          <LogoutOutlined />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};