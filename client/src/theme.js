import { createMuiTheme } from '@material-ui/core/styles'
import { blue, grey, green } from '@material-ui/core/colors'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
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
      contrastText: '#fff',
    },

    light: {
      main: grey[200],
    },

    macros: {
      protein: '#ff7961',
      carbs: blue[500],
      fats: '#4caf50',
    },

    background: { default: grey[200] },
  },
})

export default theme
