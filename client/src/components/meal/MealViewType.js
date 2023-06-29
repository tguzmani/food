import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

const MealViewType = ({ viewMode, onChangeViewMode }) => {
  const { t } = useTranslation()
  return (
    <ToggleButtonGroup
      sx={{ mb: 3 }}
      fullWidth
      value={viewMode}
      variant="contained"
      exclusive
      onChange={onChangeViewMode}
    >
      <ToggleButton value="numeric">{t('mealView.numeric')}</ToggleButton>
      <ToggleButton value="percent">{t('mealView.percent')}</ToggleButton>
    </ToggleButtonGroup>
  )
}

export default MealViewType
