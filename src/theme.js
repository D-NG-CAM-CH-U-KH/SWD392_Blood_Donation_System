import { createTheme, ThemeProvider, styled } from '@mui/material/styles'
import '@fontsource/raleway'
import '@fontsource/poppins'

export const RED_700 = '#8B0B25'
export const RED_600 = '#BA0F31'
export const RED_500 = '#C83F5A'
export const RED_400 = '#E99BAD'
export const RED_300 = '#FFD8DF'
export const BG_COLOR = '#FEFEFE'
export const BLACK_COLOR = '#13141B'
export const BLUE_700 = '#39267D'
export const GREY_LIGHT = '#4B4B4B'

const theme = createTheme({
  palette: {
    background: {
      default: BG_COLOR
    },
    primary: {
      main: '#E6F4F3'
    },
    secondary: {
      main: '#051159'
    }
  },
  shape: {
    borderRadius: 0
  },
  typography: {
    allVariants: {
      fontFamily: 'Poppins, Roboto, Arial, sans-serif',
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightSemiBold: 600,
      fontWeightBold: 700
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: 'none'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    }
  }
})

export default theme