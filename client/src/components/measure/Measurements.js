import React from 'react'
import dayjs from 'dayjs'
import PropertyPlot from '../statistics/PropertyPlot'
import StatisticsTable from '../statistics/StatisticsTable'
import MeasureList from './MeasurementList'
import { Stack, Typography } from '@mui/material'
import Collapsable from 'components/layout/Collapsable'
import { useTranslation } from 'react-i18next'

const Measurements = ({ measurements, current }) => {
  let thisMeasurements = []
  
  const { t } = useTranslation()

  const [showList, setShowList] = React.useState(false)


  const toggleShowList = () => setShowList(!showList)

  if (current && dayjs().get('date') > 15) {
    // console.log('current && > 15')

    thisMeasurements = measurements.filter(
      measure =>
        dayjs().startOf('month').add(15, 'day') < dayjs(measure.createdAt) &&
        dayjs(measure.createdAt) < dayjs().endOf('month')
    )
  }

  if (current && dayjs().get('date') <= 15) {
    // console.log('current && <= 15')

    thisMeasurements = measurements.filter(
      measure =>
        dayjs().startOf('month') < dayjs(measure.createdAt) &&
        dayjs(measure.createdAt) < dayjs().endOf('month').subtract(15, 'day')
    )
  }

  if (!current && dayjs().get('date') > 15) {
    // console.log('last && > 15')

    thisMeasurements = measurements.filter(
      measure =>
        dayjs().startOf('month') < dayjs(measure.createdAt) &&
        dayjs(measure.createdAt) < dayjs().startOf('month').add(15, 'day')
    )
  }

  if (!current && dayjs().get('date') <= 15) {
    // console.log('last && <= 15')
    // console.log('end', dayjs().subtract(1, 'month').endOf('month'))

    thisMeasurements = measurements.filter(
      measure =>
        dayjs().subtract(1, 'month').startOf('month').add(15, 'day') <
          dayjs(measure.createdAt) &&
        dayjs(measure.createdAt) < dayjs().subtract(1, 'month').endOf('month')
    )
  }

  return thisMeasurements.length === 0 ? (
    <Typography variant="body1">{t('dialog.noMeasureAvailable')}</Typography>
  ) : (
    <Stack spacing={2}>
      <PropertyPlot data={thisMeasurements} property="weight" />
      <StatisticsTable data={thisMeasurements} property="weight" />
      <Collapsable open={showList} toggler={toggleShowList} text="Details">
        <MeasureList measurements={thisMeasurements} />
      </Collapsable>
    </Stack>
  )
}

export default Measurements
