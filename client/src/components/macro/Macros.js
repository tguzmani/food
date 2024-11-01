import { Grid, Box, Stack } from '@mui/material'
import React from 'react'
import Calories from './Calories'
import Cleanliness from './Cleanliness'
import Drinks from './Drinks'
import Macro from './Macro'
import useResponsive from './../../hooks/useResponsive'
import { useStoreState } from 'easy-peasy'

const Macros = () => {
  const isMobile = useResponsive('sm')
  const { userIsPremium } = useStoreState(state => state.users)
  const { alcoholUnits } = useStoreState(state => state.foods)

  const spacing = isMobile ? 0 : 10
  const justify = isMobile ? 'space-around' : 'center'

  return (
    <Box mb={3}>
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

                {alcoholUnits > 0 && <Drinks />}
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
          my={4}
          mb={6}
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
