import { Card, CardContent, Grid, Box, Divider } from '@material-ui/core'
import React from 'react'
import Calories from './Calories'
import Cleanliness from './Cleanliness'
import Drinks from './Drinks'
import Macro from './Macro'
import { getAlcoholUnits } from './../../util/food'
import useFoods from './../../hooks/useFoods'

const Macros = () => {
  const foods = useFoods('meals')

  console.log(getAlcoholUnits(foods))

  return (
    <Card>
      <CardContent>
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

        <Grid container justify='space-around' spacing={1}>
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
      </CardContent>
    </Card>
  )
}

export default Macros
