import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const useResponsive = breakpoint => {
  const theme = useTheme()

  const matches = useMediaQuery(theme.breakpoints.down(breakpoint))

  return matches
}

export default useResponsive
