import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import React from 'react'
import { mean, stdev, sum } from '../../util/index'

const StatisticsTable = ({ data, property }) => {
  const tableData = data.map(element => element[property])

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
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>Mean</TableCell>
            <TableCell align='center'>Stdev</TableCell>

            <TableCell align='center'>Min</TableCell>
            <TableCell align='center'>Max</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          <TableRow>
            <TableCell align='center'>{cellContent(row.mean)}</TableCell>
            <TableCell align='center'>{cellContent(row.stdev)}</TableCell>
            <TableCell align='center'>{cellContent(row.min)}</TableCell>
            <TableCell align='center'>{cellContent(row.max)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default StatisticsTable
