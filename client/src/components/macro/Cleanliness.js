import React from 'react'
import { getCleanliness } from '../../util/food'
import { useStoreState } from 'easy-peasy'
import { Typography, Stack, Fade } from '@mui/material'

const Cleanliness = () => {
  const { foods } = useStoreState(state => state.foods)
  const cleanliness = getCleanliness(foods)

  return (
    <Fade in={!isNaN(cleanliness)}>
      <Stack direction='row' alignItems='center' spacing={1}>
        <span role='img' aria-label='cleanliness'>
          💎
        </span>
        {!isNaN(cleanliness) && (
          <Typography>{Math.round(cleanliness)} %</Typography>
        )}
      </Stack>
    </Fade>
  )
}

export default Cleanliness
