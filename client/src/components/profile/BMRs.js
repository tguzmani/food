import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import MacroDistribution from './MacroDistribution'

const BMRs = () => {
  const user = useSelector(state => state.auth.user)
  const profile = useSelector(state => state.profile)

  if (!user) return <div>Loading...</div>

  // 66.5 + (13.75 * weight in kg) + (5.003 * height in cm) – (6.755 * age in years)

  const weight =
    user.units === 'kg' ? profile.baseWeight : profile.baseWeight / 2.2

  const bmr =
    user?.sex === 'f'
      ? 655.1 + 9.563 * weight + 1.85 * profile.height - 4.676 * profile.age
      : 66.5 + 13.75 * weight + 5.003 * profile.height - 6.755 * profile.age

  const bmra = bmr * profile.activity

  const bmro = bmra + profile.offset

  return (
    <Box>
      <Box mb={3}>
        <Typography align='center' variant='h6' gutterBottom>
          {bmro.toFixed(0)} cal
        </Typography>
        <MacroDistribution />
      </Box>

      {/* <Detail title='BMR'>
        This is your <strong>Basal Metabolic Rate</strong>. A rough
        approximation of how many calories you need to consume in order to
        maintain your base weight, without doing any physical activity.
      </Detail>

      {bmr}

      <Detail title='BMRa'>
        This is your <strong>Basal Metabolic Rate with Activity</strong>. A
        rough approximation of how many calories you need to consume in order to
        maintain your base weight, doing physical activities.
      </Detail>

      {bmra}

      <Detail title='BMRo'>
        This is your{' '}
        <strong>Basal Metabolic Rate with Activity and Offset</strong>. A rough
        approximation of how many calories you need to consume in order to
        maintain your base weight, doing physical activities and also taking in
        account your fitness goals: burning fat or building muscle.
      </Detail>

      {bmro} */}
    </Box>
  )
}

export default BMRs
