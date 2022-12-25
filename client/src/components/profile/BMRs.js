import React from 'react'
import { useSelector } from 'react-redux'
import { Box, Typography } from '@mui/material'
import MacroDistribution from './MacroDistribution'
import useUser from 'hooks/useUser'
import { useStoreState } from 'easy-peasy'

const BMRs = () => {
  const { user, profile, offsetBMR } = useStoreState(state => state.users)

  if (!user) return <div>Loading...</div>

  return (
    <Box>
      <Box mb={3}>
        <Typography align='center' variant='h6' gutterBottom>
          {offsetBMR.toFixed(0)} cal
        </Typography>
        <MacroDistribution />
      </Box>
    </Box>
  )
}

export default BMRs
