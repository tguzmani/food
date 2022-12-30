import React from 'react'
import { Grid, Box, Typography } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import useResponsive from 'hooks/useResponsive';

const MacroDistribution = () => {
  const { profile, user, profileBaseWeight, offsetBMR } = useStoreState(
    state => state.users
  )

  const isMobile = useResponsive('sm')

  if (!user) return <div>Loading...</div>

  const proteinCalories = profileBaseWeight * 2.2 * profile.proteinPref * 4
  const fatCalories = (offsetBMR * profile.fatPref) / 100
  const carbsCalories = offsetBMR - proteinCalories - fatCalories

  const proteinGrams = proteinCalories / 4
  const fatGrams = fatCalories / 9
  const carbsGrams = carbsCalories / 4

  return (
    <Grid container spacing={3} justifyContent='space-between' mb={isMobile ? 10 : 0}>
      <Grid item xs={4}>
        <Box>
          <Typography align='center'>Protein</Typography>
          <Typography align='center' variant='body2'>
            {proteinGrams.toFixed(0)} g
          </Typography>
          <Typography display='block' align='center' variant='caption'>
            {proteinCalories.toFixed(0)} cal
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={4}>
        <Box>
          <Typography align='center'>Carbs</Typography>
          <Typography align='center' variant='body2'>
            {carbsGrams.toFixed(0)} g
          </Typography>
          <Typography display='block' align='center' variant='caption'>
            {carbsCalories.toFixed(0)} cal
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={4}>
        <Box>
          <Typography align='center'>Fat</Typography>
          <Typography align='center' variant='body2'>
            {fatGrams.toFixed(0)} g
          </Typography>
          <Typography display='block' align='center' variant='caption'>
            {fatCalories.toFixed(0)} cal
          </Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default MacroDistribution
