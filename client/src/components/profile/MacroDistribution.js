import React from 'react'
import { Grid, Typography, Stack } from '@mui/material'
import { useStoreState } from 'easy-peasy'

const Macro = ({ name, grams, calories, color }) => (
  <Stack alignItems='center'>
    <Typography align='center' variant='body1' color={color} gutterBottom>
      {name}
    </Typography>
    <Typography align='center' variant='body2'>
      {grams.toFixed(0)} g
    </Typography>
    <Typography display='block' align='center' variant='caption'>
      {calories.toFixed(0)} cal
    </Typography>
  </Stack>
)

const MacroDistribution = () => {
  const {
    user,
    proteinCalories,
    fatCalories,
    carbsCalories,
    proteinGrams,
    fatGrams,
    carbsGrams,
  } = useStoreState(state => state.users)

  if (!user) return <div>Loading...</div>

  return (
    <Grid container spacing={3} justifyContent='space-between'>
      <Grid item xs={4}>
        <Macro
          name='Protein'
          grams={proteinGrams}
          calories={proteinCalories}
          color='error.main'
        />
      </Grid>

      <Grid item xs={4}>
        <Macro
          name='Carbs'
          grams={carbsGrams}
          calories={carbsCalories}
          color='primary.main'
        />
      </Grid>

      <Grid item xs={4}>
        <Macro
          name='Fat'
          grams={fatGrams}
          calories={fatCalories}
          color='success.main'
        />
      </Grid>
    </Grid>
  )
}

export default MacroDistribution
