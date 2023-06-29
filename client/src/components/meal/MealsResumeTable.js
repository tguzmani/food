import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import useMealNumbers from 'hooks/useMealNumbers'
import MealsResumeTableRow from './MealsResumeTableRow'
import React from 'react'
import { useTranslation } from 'react-i18next'

const MealsResumeTable = ({ viewMode }) => {
  const mealNumbers = useMealNumbers()

  const { t } = useTranslation()

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="center">{t('common.Cal')}</TableCell>
            <TableCell align="center">{t('common.protein')}</TableCell>
            <TableCell align="center">{t('common.carbs')}</TableCell>
            <TableCell align="center">{t('common.fat')}</TableCell>
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
