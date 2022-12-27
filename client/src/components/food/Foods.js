import { Collapse, List } from '@mui/material'
import React from 'react'
import { TransitionGroup } from 'react-transition-group'
import FoodItem from './FoodItem'

const Foods = ({ foods }) => {
  return (
    <List>
      {foods.map(food => (
        <FoodItem key={food._id} food={food} />
      ))}
    </List>
  )
}

export default Foods
