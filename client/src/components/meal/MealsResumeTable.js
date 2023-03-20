import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useStoreState } from 'easy-peasy'
import useMealNumbers from 'hooks/useMealNumbers'
import React from 'react'
import MealsResumeTableRow from './MealsResumeTableRow'

const MealsResumeTable = ({ viewMode }) => {
  const mealNumbers = useMealNumbers()

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align='center'>#</TableCell>
            <TableCell align='center'>Cal</TableCell>
            <TableCell align='center'>Protein</TableCell>
            <TableCell align='center'>Carbs</TableCell>
            <TableCell align='center'>Fat</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mealNumbers.map(mealNumber => (
            <MealsResumeTableRow mealNumber={mealNumber} viewMode={viewMode} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default MealsResumeTable
