import { TableCell, TableRow, Typography } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { getTotalCalories, getTotalMacro } from 'util/food'

const Value = ({ children, color }) => {
  const { userIsPremium } = useStoreState(state => state.users)

  return (
    <Typography
      variant="body2"
      align="center"
      xs={3}
      sx={{
        color,
        visibility: userIsPremium ? 'visible' : 'hidden',
        opacity: Math.round(children) === 0 ? 0.3 : 1,
      }}
    >
      {children}
    </Typography>
  )
}

const toPercent = value => {
  return Math.round(value * 100) + '%'
}

const MealsResumeTableRow = ({ viewMode, mealNumber }) => {
  const { foods } = useStoreState(state => state.foods)

  const thisMealFoods = foods.filter(food => food.meal === mealNumber)

  const thisMealCalories = getTotalCalories(thisMealFoods).toFixed(0)
  const thisMealProtein = getTotalMacro(thisMealFoods, 'protein').toFixed(0)
  const thisMealCarbs = getTotalMacro(thisMealFoods, 'carbs').toFixed(0)
  const thisMealFat = getTotalMacro(thisMealFoods, 'fat').toFixed(0)

  const totalCalories = getTotalCalories(foods)
  const totalProtein = getTotalMacro(foods, 'protein')
  const totalCarbs = getTotalMacro(foods, 'carbs')
  const totalFat = getTotalMacro(foods, 'fat')

  const thisMealCaloriesPercent = toPercent(thisMealCalories / totalCalories)
  const thisMealProteinPercent = toPercent(thisMealProtein / totalProtein)
  const thisMealCarbsPercent = toPercent(thisMealCarbs / totalCarbs)
  const thisMealFatPercent = toPercent(thisMealFat / totalFat)

  return (
    <TableRow
      key={mealNumber}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell align="center">{mealNumber}</TableCell>

      <TableCell align="center">
        <Value>
          {viewMode === 'percent' ? thisMealCaloriesPercent : thisMealCalories}
        </Value>
      </TableCell>

      <TableCell align="center">
        <Value color="error.main">
          {viewMode === 'percent' ? thisMealProteinPercent : thisMealProtein}
        </Value>
      </TableCell>

      <TableCell align="center">
        <Value color="primary.main">
          {viewMode === 'percent' ? thisMealCarbsPercent : thisMealCarbs}
        </Value>
      </TableCell>

      <TableCell align="center">
        <Value color="success.main">
          {viewMode === 'percent' ? thisMealFatPercent : thisMealFat}
        </Value>
      </TableCell>
    </TableRow>
  )
}

export default MealsResumeTableRow
