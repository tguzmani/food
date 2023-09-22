import React from 'react'
import { Stack, Typography } from '@mui/material'
import { getTotalMacro } from './../../util/food'
import Progress from './Progress'
import { useStoreState } from 'easy-peasy'
import useUser from 'hooks/useUser'

const Macro = ({ macro }) => {
  const { foods } = useStoreState(state => state.foods)
  const user = useUser()

  if (!user) return <div>Loading...</div>

  const consumed = Math.round(getTotalMacro(foods, macro))
  const goal = Math.round(user.goals[macro])
  const progress = (consumed / goal) * 100

  return (
    <Stack alignItems='center'>
      <Progress progress={progress} macro={macro} />

      <Typography variant='body1' mt={1}>
        {consumed}/{goal}
      </Typography>

      <Typography variant='caption'>{goal - consumed}</Typography>
    </Stack>
  )
}

export default Macro
