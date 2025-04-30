import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

export const purpleTheme = createTheme({
  palette: {
    primary: {
      main: '#080056'
    },
    secondary: {
      main: '#543884'
    },
    error: {
      main: red.A400
    },
    custom: {
      orange: '#FFAF4D',
      orangeHover: '#FF9E2D',
      orangeActive: '#FF8C00'
    }
  },
  components: {
    MuiIconButton: {
      variants: [
        {
          props: { size: 'small' },
          style: {
            color: '#FFAF4D',
            '&:hover': {
              backgroundColor: 'rgba(255, 175, 77, 0.08)',
              color: '#FF9E2D'
            },
            '&:active': {
              color: '#FF8C00'
            }
          }
        },
        {
          props: { size: 'medium' },
          style: {
            color: '#FFAF4D',
            '&:hover': {
              backgroundColor: 'rgba(255, 175, 77, 0.08)',
              color: '#FF9E2D'
            }
          }
        }
      ]
    },
    MuiButton: {
      variants: [
        {
          props: { size: 'small', color: 'orange' },
          style: {
            backgroundColor: '#FFAF4D',
            color: '#fff',
            '&:hover': {
              backgroundColor: '#FF9E2D'
            }
          }
        }
      ]
    }
  }
});