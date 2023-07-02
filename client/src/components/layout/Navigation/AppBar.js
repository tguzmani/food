import React from 'react'
import { Toolbar, Typography, AppBar as MuiAppBar, LinearProgress, Stack } from '@mui/material'

import Fade from '@mui/material/Fade'
import useIsDarkMode from 'hooks/useIsDarkMode'
import AppBarActions from './AppBarActions'
import { useStoreActions, useStoreState } from 'config/easy-peasy.store'


const AppBar = ({ title }) => {
  const isDarkMode = useIsDarkMode()

  const { toggleCanDragFoods } = useStoreActions(actions => actions.foods)

  const state = useStoreState(state => state)

  const loadings = Object.keys(state).some(key => state[key].loading)

  return (
    <MuiAppBar
      position="fixed"
      sx={{
        backgroundColor: 'transparent',
        backdropFilter: 'blur(8px)',
        color: isDarkMode ? 'white' : 'inherit',
      }}
    >
      <Fade in={loadings}>
        <LinearProgress />
      </Fade>

      <Stack component={Toolbar} sx={{ minHeight: '40px !important' }} direction="row" justifyContent="space-between">
        <Typography variant="h6" sx={{ fontSize: 18 }}>
          {title}
        </Typography>

        <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
          <AppBarActions handleToggleDrag={toggleCanDragFoods} />
        </Stack>
      </Stack>
    </MuiAppBar>
  )
}

export default AppBar
