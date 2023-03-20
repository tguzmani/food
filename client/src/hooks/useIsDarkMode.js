const { useTheme } = require('@mui/material')

const useIsDarkMode = () => {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'

  return isDarkMode
}

export default useIsDarkMode
