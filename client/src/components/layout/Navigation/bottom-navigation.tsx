import * as React from 'react'
import Box from '@mui/material/Box'
import { BottomNavigation as MuiBottomNavigation } from '@mui/material'
import useNavigationItems from './use-navigation-items'
import BottomNavItem from './bottom-navigation.item'

const BottomNavigation = () => {
  const [value, setValue] = React.useState(0)

  const navigationItems = useNavigationItems()

  return (
    <Box sx={{ position: 'fixed', bottom: 0, width: '100vw', border: 'none' }}>
      <MuiBottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        sx={{ height: 80 }}
      >
        {navigationItems.map(navigationItem => (
          <BottomNavItem key={navigationItem.to} navigationItem={navigationItem} />
        ))}
      </MuiBottomNavigation>
    </Box>
  )
}

export default BottomNavigation
