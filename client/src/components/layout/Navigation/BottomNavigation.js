import * as React from 'react'
import Box from '@mui/material/Box'
import {
  BottomNavigation as MuiBottomNavigation,
} from '@mui/material'
import useRoutes from './useRoutes'
import BottomNavItem from './BottomNavItem'

const BottomNavigation = () => {
  const [value, setValue] = React.useState(0)

  const routes = useRoutes()

  return (
    <Box sx={{ position: 'fixed', bottom: 0, width: '100vw' }}>
      <MuiBottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        sx={{borderTop: '1px solid', borderColor: 'divider'}}
      >
        {routes.map(route => (
          <BottomNavItem route={route} />
        ))}
      </MuiBottomNavigation>
    </Box>
  )
}

export default BottomNavigation
