import React from 'react'
import { Stack, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { useTranslation } from 'react-i18next'

const NoMeasurements = () => {
  const { t } = useTranslation()

  return (
    <Stack alignItems="center">
      <InfoIcon sx={{ mb: 2, fontSize: 48 }} />
      <Typography variant="h6" align="center" gutterBottom>
        {t('dialog.noMeasureYet')}
      </Typography>
      <Typography variant="body1" align="center">
        {t('dialog.pressToAddFirstMeasure')}
      </Typography>
    </Stack>
  )
}

export default NoMeasurements
