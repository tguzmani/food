import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

const OffsetMode = ({ offsetMode, onChangeOffsetMode }) => {
  const { t } = useTranslation()

  return (
    <ToggleButtonGroup
      sx={{ mt: 1 }}
      fullWidth
      value={offsetMode}
      variant="contained"
      exclusive
      onChange={onChangeOffsetMode}
    >
      <ToggleButton value="deficit">{t('profile.deficit')}</ToggleButton>
      <ToggleButton value="maintenance">{t('profile.maintenance')}</ToggleButton>
      <ToggleButton value="surplus">{t('profile.surplus')}</ToggleButton>
    </ToggleButtonGroup>
  )
}

export default OffsetMode
