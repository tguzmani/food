import React from 'react'
import { Box, Grid, ListItem, Typography } from '@mui/material';

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
    alcohol,
  } = measure

  const Indicator = ({ emoji, value, symbol }) => (
    <>
      {value > 0 && (
        <Grid container justifyContent='space-between'>
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
      <Grid container alignItems='center' justifyContent='space-between'>
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
  );
}

export default MeasureItem
