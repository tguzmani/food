import { List } from '@material-ui/core'
import React from 'react'
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
