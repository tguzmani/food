import React from 'react'

import { Box, CircularProgress, Typography } from '@mui/material'

import { red, green, blue, amber } from '@mui/material/colors'
import useResponsive from './../../hooks/useResponsive'

const Progress = ({ progress, macro }) => {
  const SIZE = useResponsive('md') ? 55 : 70
  const THICKNESS = useResponsive('md') ? 5 : 4

  const colors = {
    protein: red[700],
    carbs: blue[700],
    fat: green[700],
  }

  return (
    <Box position='relative' display='inline-flex' my={1}>
      <CircularProgress
        className='macronutrient-circle-bottom'
        variant='determinate'
        value={100}
        size={SIZE}
        thickness={THICKNESS}
      />

      <CircularProgress
        sx={{ color: colors[macro] }}
        className='macronutrient-circle-top'
        variant='determinate'
        value={progress}
        size={SIZE}
        thickness={THICKNESS}
      />

      <CircularProgress
        sx={{ color: amber[500] }}
        className='macronutrient-circle-top'
        variant='determinate'
        value={progress - 100 > 0 ? progress - 100 : 0}
        size={SIZE}
        thickness={THICKNESS}
      />

      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position='absolute'
        display='flex'
        alignItems='center'
        justifyContent='center'
      >
        <Typography variant='body1' component='div' color='textPrimary'>
          {Math.round(progress)}%
        </Typography>
      </Box>
    </Box>
  )
}

export default Progress
