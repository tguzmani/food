import React from 'react'
import { connect } from 'react-redux'
import { Grid, LinearProgress } from '@material-ui/core'
import { getTotalMacro } from './../../util/food'
import { blue, red, green } from '@material-ui/core/colors'
import Progress from './Progress'

const Macro = ({ macro, foods, user }) => {
  if (!user) return <div>Loading...</div>

  const consumed = Math.round(getTotalMacro(foods, macro))
  const goal = Math.round(user.goals[macro])
  const progress = (consumed / goal) * 100

  return (
    <Grid container alignItems='center' spacing={2} justify='space-around'>
      <Grid item xs={1}>
        {macro.charAt(0).toUpperCase()}
      </Grid>
      <Grid item xs={7}>
        <Progress value={progress} />
      </Grid>
      <Grid item xs={3} style={{ textAlign: 'right' }}>
        {consumed} / {goal}
      </Grid>
    </Grid>
  )
}

const mapActionsToProps = {}

const mapStateToProps = state => ({
  foods: state.food.foods,
  user: state.auth.user,
})

export default connect(mapStateToProps, mapActionsToProps)(Macro)
