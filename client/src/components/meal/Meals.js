import { List } from '@mui/material'
import React from 'react'
import MealItem from './MealItem'

const Meals = ({ foods, mealNumbers }) => {
  return (
    <List disablePadding>
      {mealNumbers.map(number => (
        <MealItem key={number} number={number} foods={foods.filter(food => food.meal === number)} />
      ))}
    </List>
  )
}

export default Meals
