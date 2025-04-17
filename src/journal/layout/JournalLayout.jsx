
import { Box } from '@mui/material'
import { NavBar, SideBar } from '../components';


const drawerWith = 280;

export const JournalLayout = ({ children }) => {
    return (
      <Box sx={{ display: 'flex' }}>
        <NavBar />
        <SideBar />
        <Box 
          component="main"
          sx={{ 
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - 240px)` },
            ml: { sm: '60px' },
            mt: '64px' // Compensa el NavBar fijo
          }}
        >
          {children}
        </Box>
      </Box>
    );
  };