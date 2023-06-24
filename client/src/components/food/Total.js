import React from 'react'
import { ListItem, Grid, Typography } from '@mui/material'
import { getTotalMacro } from 'util/food'

const Value = ({ children, color }) => (
  <Grid item xs={3} sx={{ textAlign: 'right', color, fontWeight: 'bold' }}>
    <Typography variant='body2' className='text-bold'>{children && Math.round(children)}</Typography>
  </Grid>
)

const Total = ({ foods }) => {
  const totalProtein = getTotalMacro(foods, 'protein')
  const totalCarbs = getTotalMacro(foods, 'carbs')
  const totalFat = getTotalMacro(foods, 'fat')

  return (
    <ListItem >
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={5}>
          <Typography variant='body2' className='text-bold'>
            Total
          </Typography>
        </Grid>
        <Grid item xs={7}>
          <Grid
            container
            justifyContent='space-around'
            spacing={2}
            alignItems='center'
          >
            <Value />
            <Value color='error.main'>{totalProtein}</Value>
            <Value color='primary.main'>{totalCarbs}</Value>
            <Value color='success.main'>{totalFat}</Value>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default Total
