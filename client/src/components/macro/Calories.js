import { Box, Typography } from '@material-ui/core'
import React from 'react'
import { connect } from 'react-redux'
import { getTotalCalories } from '../../util/food'

const Calories = ({ foods, user }) => {
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
          style={{ marginRight: '4px', fontWeight: 500 }}
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

const mapActionsToProps = {}

const mapStateToProps = state => ({
  foods: state.food.foods,
  user: state.auth.user,
})

export default connect(mapStateToProps, mapActionsToProps)(Calories)
