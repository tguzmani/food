import React from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import { Box, Typography } from '@material-ui/core'

const NoRecipes = () => {
  return (
    <Box display='flex' alignItems='center' flexDirection='column'>
      <MenuBookIcon style={{ fontSize: '48px' }} />
      <Typography variant='h6' gutterBottom>
        No recipes!
      </Typography>
      <Typography variant='body1' align='center'>
        Add new recipes going to the Day page, create a meal, press the
        <MoreVertIcon fontSize='small' /> button and then "Create Recipe"
      </Typography>
    </Box>
  )
}

export default NoRecipes
