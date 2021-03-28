import { Card, CardContent, Typography, Box } from '@material-ui/core'
import React from 'react'
import { getTotalCalories } from '../../util/food'
import Foods from '../food/Foods'
import Total from '../food/Total'

const MealItem = ({ foods, number }) => {
  const thisMealFoods = foods.filter(food => food.meal === number)
  return (
    <Box mt={3}>
      <Card>
        <CardContent>
          {number}
          <Typography variant='body1' gutterBottom align='right'>
            {Math.round(getTotalCalories(thisMealFoods))} cal
          </Typography>

          <Foods foods={thisMealFoods} />
          <Total foods={thisMealFoods} />
        </CardContent>
      </Card>
    </Box>
  )
}

export default MealItem
