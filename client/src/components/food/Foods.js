import { Collapse, List } from '@mui/material'
import React from 'react'
import { TransitionGroup } from 'react-transition-group'
import FoodItem from './FoodItem'

const Foods = ({ foods }) => {
  return (
    <List>
      <TransitionGroup>
        {foods.map(food => (
          <Collapse key={food._id}>
            <FoodItem food={food} />
          </Collapse>
        ))}
      </TransitionGroup>
    </List>
  )
}

export default Foods
