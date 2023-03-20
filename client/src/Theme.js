import React from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { CssBaseline, createTheme } from '@mui/material'
import useUser from 'hooks/useUser'

import appTheme, { palette } from 'config/theme'

const Theme = ({ children }) => {
  const user = useUser()

  const currentTheme = createTheme({
    ...appTheme,
    palette: palette(user?.themeMode || 'light'),
  })

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}

export default Theme
