import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, Box, Typography } from '@mui/material'
import useUser from 'hooks/useUser'

const MacroDistribution = () => {
  const user = useUser()
  const profile = {}

  if (!user) return <div>Loading...</div>

  const weight =
    user.units === 'kg' ? profile.baseWeight : profile.baseWeight / 2.2

  const bmr =
    66.5 + 13.75 * weight + 5.003 * profile.height - 6.755 * profile.age

  console.log(bmr)

  const bmra = bmr * profile.activity

  const bmro = bmra + profile.offset

  const proteinCalories = weight * 2.2 * profile.proteinPref * 4
  const fatCalories = (bmro * profile.fatPref) / 100
  const carbsCalories = bmro - proteinCalories - fatCalories

  const proteinGrams = proteinCalories / 4
  const fatGrams = fatCalories / 9
  const carbsGrams = carbsCalories / 4

  return (
    <Grid container spacing={3} justifyContent='space-between'>
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
