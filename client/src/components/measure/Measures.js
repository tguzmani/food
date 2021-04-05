import React from 'react'
import dayjs from 'dayjs'
import Plot from './Plot'
import StatisticsTable from './StatisticsTable'
import MeasureList from './MeasureList'

const Measures = ({ measures, current }) => {
  let thisMeasures = []

  if (current && dayjs().get('date') > 15) {
    console.log('current && > 15')

    thisMeasures = measures.filter(
      measure =>
        dayjs().startOf('month').add(15, 'day') < dayjs(measure.createdAt) &&
        dayjs(measure.createdAt) < dayjs().endOf('month')
    )
  }

  if (current && dayjs().get('date') < 15) {
    console.log('current && < 15')

    thisMeasures = measures.filter(
      measure =>
        dayjs().startOf('month') < dayjs(measure.createdAt) &&
        dayjs(measure.createdAt) < dayjs().endOf('month').subtract(15, 'day')
    )
  }

  if (!current && dayjs().get('date') > 15) {
    console.log('last && > 15')

    thisMeasures = measures.filter(
      measure =>
        dayjs().startOf('month') < dayjs(measure.createdAt) &&
        dayjs(measure.createdAt) < dayjs().startOf('month').add(15, 'day')
    )
  }

  if (!current && dayjs().get('date') < 15) {
    console.log('last && < 15')
    console.log('end', dayjs().subtract(1, 'month').endOf('month'))

    thisMeasures = measures.filter(
      measure =>
        dayjs().subtract(1, 'month').startOf('month').add(15, 'day') <
          dayjs(measure.createdAt) &&
        dayjs(measure.createdAt) < dayjs().subtract(1, 'month').endOf('month')
    )
  }

  return (
    <>
      <Plot measures={thisMeasures} />
      <StatisticsTable measures={thisMeasures} />
      <MeasureList measures={thisMeasures} />
    </>
  )
}

export default Measures
