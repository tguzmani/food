import { Grid, Box } from '@mui/material'
import React from 'react'
import Calories from './Calories'
import Cleanliness from './Cleanliness'
import Drinks from './Drinks'
import Macro from './Macro'
import { getAlcoholUnits } from './../../util/food'
import useResponsive from './../../hooks/useResponsive'
import { useStoreActions } from 'easy-peasy'

const Macros = () => {
  const isMobile = useResponsive('md')
  const { foods } = useStoreActions(state => state.foods)

  const spacing = isMobile ? 0 : 10
  const justify = isMobile ? 'space-around' : 'center'

  return (
    <Box>
      <Box mb={2}>
        <Grid
          container
          display='flex'
          direction='column'
          alignItems='center'
          spacing={1}
        >
          <Grid item>
            <Calories />
          </Grid>

          <Grid item>
            <Grid container spacing={4}>
              <Grid item>
                <Cleanliness />
              </Grid>

              {getAlcoholUnits(foods) > 0 && (
                <Grid item>
                  <Drinks />
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Grid container justifyContent={justify} spacing={spacing}>
        <Grid item>
          <Macro macro='protein' />
        </Grid>

        <Grid item>
          <Macro macro='carbs' />
        </Grid>

        <Grid item>
          <Macro macro='fat' />
        </Grid>
      </Grid>
      {/* </CardContent>
    </Card> */}
    </Box>
  )
}

export default Macros
