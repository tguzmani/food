import { TableCell, TableRow, Typography } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import React from 'react'
import { getTotalCalories, getTotalMacro } from 'util/food'

const Value = ({ children, color }) => {
  const { userIsPremium } = useStoreState(state => state.users)

  return (
    <Typography
      variant='body2'
      align='center'
      xs={3}
      sx={{
        color,
        visibility: userIsPremium ? 'visible' : 'hidden',
        opacity: Math.round(children) === 0 ? 0.3 : 1,
      }}
    >
      {children && Math.round(children)}
    </Typography>
  )
}

const MealsResumeTableRow = ({ mealNumber }) => {
  const { foods } = useStoreState(state => state.foods)

  const thisMealFoods = foods.filter(food => food.meal === mealNumber)

  const thisMealCalories = getTotalCalories(thisMealFoods)
  const thisMealProtein = getTotalMacro(thisMealFoods, 'protein')
  const thisMealCarbs = getTotalMacro(thisMealFoods, 'carbs')
  const thisMealFat = getTotalMacro(thisMealFoods, 'fat')

  return (
    <TableRow
      key={mealNumber}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell align='center'>
        {mealNumber}
      </TableCell>

      <TableCell align='center'>
        <Value>{thisMealCalories}</Value>
      </TableCell>

      <TableCell align='center'>
        <Value color='error.main'>{thisMealProtein}</Value>
      </TableCell>

      <TableCell align='center'>
        <Value color='primary.main'>{thisMealCarbs}</Value>
      </TableCell>

      <TableCell align='center'>
        <Value color='success.main'>{thisMealFat}</Value>
      </TableCell>
    </TableRow>
  )
}

export default MealsResumeTableRow
