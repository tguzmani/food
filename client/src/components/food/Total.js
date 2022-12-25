import React from 'react'
import { ListItem, Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { getTotalMacro } from 'util/food'

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    fontWeight: 600,
  },
}))

const Value = ({ children, color }) => (
  <Grid item xs={3} sx={{ textAlign: 'right', color }}>
    {children && Math.round(children)}
  </Grid>
)

const Total = ({ foods }) => {
  const classes = useStyles()
  const totalProtein = getTotalMacro(foods, 'protein')
  const totalCarbs = getTotalMacro(foods, 'carbs')
  const totalFat = getTotalMacro(foods, 'fat')

  return (
    <ListItem className={classes.root}>
      <Grid container spacing={2} alignItems='center'>
        <Grid item xs={5}>
          Total
        </Grid>
        <Grid item xs={7}>
          <Grid
            container
            justifyContent='space-around'
            spacing={2}
            alignItems='center'
          >
            <Value /> 
            <Value color='red'>{totalProtein}</Value>
            <Value color='blue'>{totalCarbs}</Value>
            <Value color='green'>{totalFat}</Value>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  );
}

export default Total
