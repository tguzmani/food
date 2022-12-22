import { createTheme } from '@mui/material'
import { blue } from '@mui/material/colors'

const typography = {
  fontFamily: 'Lato, sans-serif',
}

const palette = {
  primary: {
    light: blue[400],
    main: blue[500],
    dark: '#002884',
    contrastText: '#fff',
  },

  secondary: {
    light: '#ff7961',
    main: '#f44336',
    dark: '#ba000d',
    contrastText: '#fff',
  },

  dark: {
    main: '#272C34',
    light: '#39414d',
    contrastText: '#fff',
  },

  light: {
    main: '#F5F7FA',
  },
}

const theme = createTheme({
  typography,
  palette,
  shape: { borderRadius: 8 },
})

export default theme
