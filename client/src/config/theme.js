import { createTheme } from '@mui/material'
import { blue } from '@mui/material/colors'

const baseTheme = createTheme({})

const drawerWidth = 260

const typography = {
  fontFamily: 'Poppins, sans-serif',

  body2: {
    fontSize: '14px',
  }
}

export const palette = mode => ({
  mode,
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

  grey: {
    950: '#1e1e1e',
  }
})

const theme = createTheme({
  typography,
  shape: { borderRadius: 8 },

  mixins: {
    drawer: {
      width: drawerWidth,
    },
  },

  components: {
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          '&.macronutrient-circle': {
            // '&-bottom': {
            //   color: baseTheme.palette.grey[300],
            // },
            '&-top': {
              position: 'absolute',
              left: 0,
            },
          },
        },
      },
    },

    MuiListItem: {
      styleOverrides: {
        root: {
          '&:last-child': {
            borderBottom: 'none'
          }
        },
      },
    },

    MuiAppBar: {
      styleOverrides: {
        root: {
          width: `calc(100% - ${drawerWidth}px)`,
          paddingBottom: '6px',
          boxShadow: 'none',
          // backgroundColor: baseTheme.palette.background.default,
          // color: baseTheme.palette.text.primary,
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

    MuiTypography: {
      styleOverrides: {
        root: {
          '&.text-bold': {
            fontWeight: 'bold',
          },
          '&.text-muted': {
            color: baseTheme.palette.grey['400']
          }
        }
      }
    }
  },
})

export default theme
