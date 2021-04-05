import React from 'react'

import { Box, CircularProgress, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { red, green, blue, amber } from '@material-ui/core/colors'
import useResponsive from './../../hooks/useResponsive'

const useStyles = makeStyles(theme => ({
  bottom: {
    color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },

  top: {
    // color: theme.palette.primary.main,
    left: 0,
    position: 'absolute',
  },

  overflow: {
    color: amber[500],
    left: 0,
    position: 'absolute',
  },
}))

const Progress = ({ progress, macro }) => {
  const classes = useStyles()
  const SIZE = useResponsive() ? 55 : 70
  const THICKNESS = useResponsive() ? 4 : 3

  const colors = {
    protein: red[700],
    carbs: blue[700],
    fat: green[700],
  }

  return (
    <Box position='relative' display='inline-flex' my={1}>
      <CircularProgress
        className={classes.bottom}
        variant='determinate'
        value='100'
        size={SIZE}
        thickness={THICKNESS}
      />

      <CircularProgress
        className={classes.top}
        style={{ color: colors[macro] }}
        variant='determinate'
        value={progress}
        size={SIZE}
        thickness={THICKNESS}
      />

      <CircularProgress
        className={classes.overflow}
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
