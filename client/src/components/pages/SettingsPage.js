import React, { useState } from 'react'

import UserInformation from '../profile/UserInformation'
import FAB from '../layout/FAB'
import SaveIcon from '@mui/icons-material/Save'
// import { useStoreActions, useStoreState } from 'easy-peasy'
import Page from 'components/layout/Page'
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import useIsDarkMode from 'hooks/useIsDarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import useResponsive from 'hooks/useResponsive'
import LanguageIcon from '@mui/icons-material/Language'
import LanguageSelectorDialog from 'components/settings/language-selector.dialog'
import { useStoreActions, useStoreState } from 'config/easy-peasy.store'
import useToggle from 'hooks/useToggle'
import { useTranslation } from 'react-i18next'
import { languages } from 'i18n/languages'

const SettingsPage = () => {
  const { user, loading, profile } = useStoreState(state => state.users)
  const { updateUser } = useStoreActions(state => state.users)
  const isDarkMode = useIsDarkMode()
  const isMobile = useResponsive('sm')

  const { i18n } = useTranslation()
  const { t } = useTranslation()

  const { value: openLanguageDialog, toggleValue: toggleOpenLanguageDialog } = useToggle()

  if (!user) return <div>Loading...</div>

  const ThemeIcon = isDarkMode ? DarkModeIcon : LightModeIcon

  const handleToggleTheme = () => {
    updateUser({ themeMode: isDarkMode ? 'light' : 'dark' })
  }

  const displayLanguage = languages.find(language => language.code === i18n.language)

  return (
    <Page pathname="/settings">
      <Box mb={4}>
        <Typography variant="caption">{t('settings.display')}</Typography>
        <List>
          <ListItem
            secondaryAction={
              <IconButton edge="end" onClick={handleToggleTheme}>
                <ThemeIcon />
              </IconButton>
            }
          >
            <ListItemAvatar>
              <ColorLensIcon />
            </ListItemAvatar>

            <ListItemText primary={t('settings.display')} secondary={t('settings.darkMode')} />
          </ListItem>
        </List>

        <Divider sx={{ mb: 2 }} />

        <Typography variant="caption">{t('settings.accessibility')}</Typography>
        <List>
          <ListItemButton onClick={toggleOpenLanguageDialog}>
            <ListItemAvatar>
              <LanguageIcon />
            </ListItemAvatar>

            <ListItemText primary={t('settings.language')} secondary={t(displayLanguage?.i18nKey)} />

            <LanguageSelectorDialog open={openLanguageDialog} onClose={toggleOpenLanguageDialog} />
          </ListItemButton>
        </List>
      </Box>
    </Page>
  )
}

export default SettingsPage
