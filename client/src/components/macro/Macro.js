import React from 'react'
import { connect } from 'react-redux'
import { Grid, Typography } from '@mui/material'
import { getTotalMacro } from './../../util/food'
import Progress from './Progress'
import useFoods from './../../hooks/useFoods'

const Macro = ({ macro, user }) => {
  const foods = useFoods('meals')

  if (!user) return <div>Loading...</div>

  const consumed = Math.round(getTotalMacro(foods, macro))
  const goal = Math.round(user.goals[macro])
  const progress = (consumed / goal) * 100

  return (
    <Grid container display='flex' direction='column' alignItems='center'>
      {/* <Grid item>{capitalize(macro.charAt(0))}</Grid> */}

      <Grid item>
        <Progress progress={progress} macro={macro} />
      </Grid>

      <Grid item>
        {consumed}/{goal}
      </Grid>
      <Grid item>
        <Typography variant='caption'>{goal - consumed}</Typography>
      </Grid>
    </Grid>
  )
}

const mapActionsToProps = {}

const mapStateToProps = state => ({
  user: state.auth.user,
})

export default connect(mapStateToProps, mapActionsToProps)(Macro)
