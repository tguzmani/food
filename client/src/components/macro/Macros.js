import { Grid, Box, Stack } from '@mui/material'
import React from 'react'
import Calories from './Calories'
import Cleanliness from './Cleanliness'
import Drinks from './Drinks'
import Macro from './Macro'
import { getAlcoholUnits } from './../../util/food'
import useResponsive from './../../hooks/useResponsive'
import { useStoreActions } from 'easy-peasy'
import useUser from 'hooks/useUser'

const Macros = () => {
  const isMobile = useResponsive('sm')
  const { foods } = useStoreActions(state => state.foods)
  const { userIsPremium } = useStoreActions(state => state.users)

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
            {userIsPremium && (
              <Stack direction='row' alignItems='center' spacing={4}>
                <Cleanliness />

                {getAlcoholUnits(foods) > 0 && <Drinks />}
              </Stack>
            )}
          </Grid>
        </Grid>
      </Box>

      {userIsPremium && (
        <Stack
          direction='row'
          alignItems='center'
          justifyContent={justify}
          spacing={spacing}
        >
          <Macro macro='protein' />
          <Macro macro='carbs' />
          <Macro macro='fat' />
        </Stack>
      )}
    </Box>
  )
}

export default Macros
