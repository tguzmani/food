import { Box, Typography } from '@mui/material'
import React from 'react'
import { getTotalCalories } from '../../util/food'
import { useStoreState } from 'easy-peasy'
import useUser from 'hooks/useUser'

const Calories = () => {
  const { foods } = useStoreState(state => state.foods)
  const user = useUser()

  if (!user) return <div>Loading...</div>

  const caloriesConsumed = getTotalCalories(foods)
  const caloricGoal = getTotalCalories([user.goals])
  const difference = Math.round(caloricGoal - caloriesConsumed)
  const verb = difference === 0 ? 'Perfect' : difference > 0 ? 'left' : 'over'

  return (
    <div>
      <Box display='flex' alignItems='flex-end' justifyContent='center'>
        <Typography
          variant='h4'
          sx={{ marginRight: '4px', fontWeight: 500 }}
        >
          {Math.round(caloriesConsumed)}
        </Typography>
        <Typography variant='h5'>/ {Math.round(caloricGoal)} cal</Typography>
      </Box>

      <Box display='flex' justifyContent='center'>
        <Typography variant='caption' align='center'>
          {Math.abs(difference)} cal {verb}
        </Typography>
      </Box>
    </div>
  )
}

export default Calories
