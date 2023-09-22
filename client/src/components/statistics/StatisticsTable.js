import {
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import React from 'react'
import { mean, stdev, sum } from '../../util/index'
import { useTranslation } from 'react-i18next'

const statistics = ['mean', 'stdev', 'min', 'max']

const StatisticsTable = ({ data, property }) => {
  const tableData = data.map(element => element[property])

  const { t } = useTranslation()

  const cellContent = value => (isNaN(value) || !isFinite(value) ? '--' : value)

  const row = {
    min: Math.min(...tableData).toFixed(2),
    max: Math.max(...tableData).toFixed(2),
    mean: mean(tableData).toFixed(2),
    stdev: stdev(tableData).toFixed(2),
    sum: sum(tableData).toFixed(2),
  }

  return (
    <Grid container component={Paper} sx={{ p: 2, my: 2 }}>
      {statistics.map(stat => (
        <Grid item xs={3}>
          <Stack alignItems="center" spacing={2}>
            <Typography variant="body1" align="center">
              {cellContent(row[stat])}
            </Typography>
            <Typography variant="caption" color="grey.500">
              {t(`measurements.${stat}`)}
            </Typography>
          </Stack>
        </Grid>
      ))}
    </Grid>
  )
}

export default StatisticsTable
