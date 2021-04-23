import React from 'react'
import {
  ListItem,
  Grid,
  Divider,
  Typography,
  makeStyles,
} from '@material-ui/core'
import { capitalize } from './../../util/index'
import { getTotalMacro } from './../../util/food'

const useStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    fontWeight: 600,
  },
}))

const Value = ({ children, color }) => (
  <Grid item xs={3} style={{ textAlign: 'right', color }}>
    {children}
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
            justify='space-around'
            spacing={2}
            alignItems='center'
          >
            <Value></Value>
            <Value color='red'>{Math.round(totalProtein)}</Value>
            <Value color='blue'>{Math.round(totalCarbs)}</Value>
            <Value color='green'>{Math.round(totalFat)}</Value>
          </Grid>
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default Total
