import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { mean, stdev, sum } from '../../util/index'
import { useTranslation } from 'react-i18next'

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
    <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">{t('measurements.mean')}</TableCell>
            <TableCell align="center">{t('measurements.stdev')}</TableCell>
            <TableCell align="center">{t('measurements.min')}</TableCell>
            <TableCell align="center">{t('measurements.max')}</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow sx={{ '.MuiTableCell-root': { borderBottom: 'none' } }}>
            <TableCell align="center">{cellContent(row.mean)}</TableCell>
            <TableCell align="center">{cellContent(row.stdev)}</TableCell>
            <TableCell align="center">{cellContent(row.min)}</TableCell>
            <TableCell align="center">{cellContent(row.max)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default StatisticsTable
