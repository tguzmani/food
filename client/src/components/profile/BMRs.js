import React from 'react'
import { Box, Typography } from '@mui/material'
import MacroDistribution from './MacroDistribution'
import { useStoreState } from 'easy-peasy'

const BMRs = () => {
  const { user, offsetBMR } = useStoreState(state => state.users)

  if (!user) return <div>Loading...</div>

  return (
    <>
      <Typography align='center' variant='h6' mb={2}>
        {offsetBMR.toFixed(0)} cal
      </Typography>
      <MacroDistribution />
    </>
  )
}

export default BMRs
