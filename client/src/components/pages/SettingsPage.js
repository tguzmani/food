import React, { useState } from 'react'

import UserInformation from '../profile/UserInformation'
import FAB from './../layout/FAB'
import SaveIcon from '@mui/icons-material/Save'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Page from 'components/layout/Page'
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import useIsDarkMode from 'hooks/useIsDarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import useResponsive from 'hooks/useResponsive'
import LanguageIcon from '@mui/icons-material/Language';

const SettingsPage = () => {
  const { user, loading, profile } = useStoreState(state => state.users)
  const { updateUser } = useStoreActions(state => state.users)
  const isDarkMode = useIsDarkMode()
  const isMobile = useResponsive('sm')

  if (!user) return <div>Loading...</div>

  const ThemeIcon = isDarkMode ? DarkModeIcon : LightModeIcon

  const handleToggleTheme = () => {
    updateUser({ themeMode: isDarkMode ? 'light' : 'dark' })
  }

  return (
    <Page pathname='/settings'>
      <Box mb={4}>
        <Typography variant='caption'>Display</Typography>
        <List sx={{ '& .MuiListItem-root': { px: 0 } }}>
          <ListItem
            secondaryAction={
              <IconButton edge='end' onClick={handleToggleTheme}>
                <ThemeIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <ColorLensIcon />
            </ListItemAvatar>

            <ListItemText primary='Theme' secondary='Dark mode' />
          </ListItem>
        </List>

        <Divider sx={{ mb: 2 }} />

        <Typography variant='caption'>Accessibility</Typography>
        <List sx={{ '& .MuiListItem-root': { px: 0 } }}>
          <ListItem>
            <ListItemAvatar>
              <LanguageIcon />
            </ListItemAvatar>

            <ListItemText primary='Language' secondary='English' />
          </ListItem>
        </List>
      </Box>
    </Page>
  )
}

export default SettingsPage
