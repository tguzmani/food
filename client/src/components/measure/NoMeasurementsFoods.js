import React from 'react'
import { Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import InfoIcon from '@mui/icons-material/Info'
import { useTranslation } from 'react-i18next'

const NoMeasurementsFoods = () => {
  const { t } = useTranslation()

  return (
    <Stack alignItems="center">
      <InfoIcon sx={{ mb: 2, fontSize: 48 }} />
      <Typography variant="h6" align="center" gutterBottom>
        {t('dialog.noMeasureYet')}
      </Typography>
      <Typography variant="body1" align="center">
        {t('dialog.goTo')} <Link to="/measurements">{t('measurements.measurements')}</Link>{' '}
        {t('dialog.addFirstMeasureBeforeFood')}
      </Typography>
    </Stack>
  )
}

export default NoMeasurementsFoods
