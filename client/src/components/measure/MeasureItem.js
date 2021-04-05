import React from 'react'
import {
  Box,
  Grid,
  ListItem,
  ListItemText,
  Typography,
} from '@material-ui/core'

import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from 'dayjs'
dayjs.extend(relativeTime)

const MeasureItem = ({ measure }) => {
  const {
    weight,
    sleep,
    fat,
    cleanliness,
    calories,
    createdAt,
    macros,
    alcohol,
  } = measure

  const Macro = ({ macro }) => (
    <>
      {macros[macro] > 0 && (
        <Typography variant='body2'>{Math.round(macros[macro])} </Typography>
      )}
    </>
  )

  const Indicator = ({ emoji, value, symbol }) => (
    <>
      {value > 0 && (
        <Grid container justify='space-between'>
          <Grid item>
            <span role='img'>{emoji}</span>
          </Grid>
          <Grid item>
            {value}
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
              {weight} lb
            </Typography>
            {calories > 0 && (
              <Typography variant='body2'>
                {Math.round(calories)} cal
              </Typography>
            )}
            {/* <Box display='flex'>
              <Macro macro='protein' />
              <Macro macro='carbs' />
              <Macro macro='fat' />
            </Box> */}
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
