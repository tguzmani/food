import { createTheme, adaptV4Theme } from '@mui/material/styles';
import { blue } from '@mui/material/colors'

const typography = {
  fontFamily: ['Lato', 'sans-serif'].join(','),
  // fontWeightMedium: 700,
}

const overrides = {
  MuiFormControl: {
    root: {
      '&.bg-white': { backgroundColor: '#fff' },
    },
  },

  MuiTooltip: {
    tooltip: {
      fontSize: '1em',
    },
  },
}

const shape = {
  borderRadius: 8,
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

  // background: { default: '#F5F7FA' },
}

const theme = createTheme(adaptV4Theme({
  typography,
  shape,
  palette,
  overrides,
}))

export default theme
