import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react'
import { mean, stdev, sum } from '../../util/index'

const StatisticsTable = ({ data, property }) => {
  const tableData = data.map(element => element[property])

  const row = {
    min: Math.min(...tableData).toFixed(2),
    max: Math.max(...tableData).toFixed(2),
    mean: mean(tableData).toFixed(2),
    stdev: stdev(tableData).toFixed(2),
    sum: sum(tableData).toFixed(2),
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                Mean
              </TableCell>
              <TableCell align='center'>
                Stdev
              </TableCell>

              <TableCell align='center'>
                Min
              </TableCell>
              <TableCell align='center'>
                Max
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            <TableRow>
              <TableCell align='center'>
                {row.mean}
              </TableCell>
              <TableCell align='center'>
                {row.stdev}
              </TableCell>
              <TableCell align='center'>
                {row.min}
              </TableCell>
              <TableCell align='center'>
                {row.max}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default StatisticsTable
