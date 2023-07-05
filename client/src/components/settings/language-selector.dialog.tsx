import React, { useState } from 'react'
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
} from '@mui/material'
import { EmojiFlags } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { languages } from 'i18n/languages'
import useLocalStorage from 'hooks/use-local-storage'

interface LanguageSelectorDialogProps {
  open: boolean
  onClose: () => void
}

const LanguageSelectorDialog = ({ open, onClose }: any) => {
  const localStorageLanguage = useLocalStorage('lng')

  const { i18n } = useTranslation()
  const { t } = useTranslation()

  const handleChangeLanguage = (language: string) => (event: any) => {
    i18n.changeLanguage(language)
    localStorageLanguage.set(language)
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t('settings.chooseLanguage')}</DialogTitle>
      <DialogContent>
        <List dense>
          {languages.map(language => (
            <ListItem key={language.code} disablePadding>
              <ListItemButton onClick={handleChangeLanguage(language.code)} sx={{ p: 0 }}>
                <Radio checked={i18n.language === language.code} />
                <ListItemText primary={`${language.flag} ${t(language.i18nKey)}`} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  )
}

export default LanguageSelectorDialog
