import React from 'react'
import {
  Box,
  Grid,
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core'

import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
import { red, blue, green } from '@material-ui/core/colors'
dayjs.extend(relativeTime)

const useStyles = makeStyles(theme => ({
  circle: {
    borderRadius: '50%',
    width: '0.5rem',
    height: '0.5rem',
  },
}))

const MeasureItem = ({ measure }) => {
  const colors = {
    protein: red[700],
    carbs: blue[700],
    fat: green[700],
  }

  const classes = useStyles()

  const {
    weight,
    sleep,
    fat,
    cleanliness,
    calories,
    createdAt,
    alcohol,
  } = measure

  const Indicator = ({ emoji, value, symbol }) => (
    <>
      {value > 0 && (
        <Grid container justify='space-between'>
          <Grid item>
            <span role='img'>{emoji}</span>
          </Grid>
          <Grid item>
            {Math.round(value)}
            {symbol && symbol}
          </Grid>
        </Grid>
      )}
    </>
  )

  return (
    <ListItem divider>
      <Grid container alignItems='center' justify='space-between'>
        <Grid item xs={6}>
          <Box>
            <Typography variant='caption'>
              {dayjs(createdAt).fromNow()}
            </Typography>
            <Typography gutterBottom variant='body1'>
              {weight} lb {fat > 0 && `· ${fat}%`}
            </Typography>
            {calories > 0 && (
              <Typography variant='body1'>
                {Math.round(calories)} cal 
              </Typography>
            )}
          </Box>
        </Grid>

        <Grid item xs={3} md={1}>
          <Indicator emoji='🛏️' value={sleep} />
          <Indicator emoji='💎' value={cleanliness} symbol='%' />
          <Indicator emoji='🥃' value={alcohol} />
        </Grid>
      </Grid>
    </ListItem>
  )
}

export default MeasureItem
