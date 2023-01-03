import { createTheme } from '@mui/material'
import { blue } from '@mui/material/colors'

const baseTheme = createTheme({})

const drawerWidth = 260

const typography = {
  fontFamily: 'Lato, sans-serif',
}

const palette = {
  primary: {
    lighter: blue[100],
    light: blue[300],
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

  // light: {
  //   main: '#F5F7FA',
  // },
}

const theme = createTheme({
  typography,
  palette,
  shape: { borderRadius: 8 },

  mixins: {
    drawer: {
      width: drawerWidth,
    }
  },

  components: {
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          '&.macronutrient-circle': {
            '&-bottom': {
              color: baseTheme.palette.grey[300],
            },
            '&-top': {
              position: 'absolute',
              left: 0,
            },
          },
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          width: `calc(100% - ${drawerWidth}px)`,
          boxShadow: 'none',
          backgroundColor: baseTheme.palette.background.default,
          color: baseTheme.palette.text.primary,
          [baseTheme.breakpoints.down('sm')]: {
            width: '100%',
          },
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: drawerWidth,
          backgroundColor: baseTheme.palette.grey[900],
          color: baseTheme.palette.grey[100],
          padding: baseTheme.spacing(2),
        },
      },
    },
  },
})

export default theme
