import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import React from 'react'
import { mean, stdev, sum } from './../../util/index'

const useStyles = makeStyles(theme => ({
  root: { padding: theme.spacing(1) },
}))

const StatisticsTable = ({ measures }) => {
  const data = measures.map(measure => measure['weight'])

  const classes = useStyles()

  const row = {
    min: Math.min(...data),
    max: Math.max(...data),
    mean: mean(data).toFixed(2),
    stdev: stdev(data).toFixed(2),
    sum: sum(data).toFixed(2),
  }

  return (
    <div>
      <TableContainer component={Paper}>
        {/* <Table className={classes.table} size='small'> */}
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell className={classes.root} align='center'>
                Mean
              </TableCell>
              <TableCell className={classes.root} align='center'>
                Stdev
              </TableCell>
              <TableCell className={classes.root} align='center'>
                Sum
              </TableCell>
              <TableCell className={classes.root} align='center'>
                Min
              </TableCell>
              <TableCell className={classes.root} align='center'>
                Max
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {/* <TableCell component='th' scope='row'>
                {row.name}
              </TableCell> */}
              <TableCell className={classes.root} align='center'>
                {row.mean}
              </TableCell>
              <TableCell className={classes.root} align='center'>
                {row.stdev}
              </TableCell>
              <TableCell className={classes.root} align='center'>
                {row.sum}
              </TableCell>
              <TableCell className={classes.root} align='center'>
                {row.min}
              </TableCell>
              <TableCell className={classes.root} align='center'>
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
