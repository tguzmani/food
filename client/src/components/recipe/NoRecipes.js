import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { Box, Typography } from '@mui/material'

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
