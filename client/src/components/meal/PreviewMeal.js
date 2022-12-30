import {
  Card,
  CardContent,
  Typography,
  Box,
  CardActions,
  Button,
  Menu,
  MenuItem,
  CardHeader,
  Avatar,
  Stack,
} from '@mui/material'
import React from 'react'
import { getTotalCalories } from '../../util/food'
import Foods from '../food/Foods'
import Total from '../food/Total'
import WhatDidYouEat from './WhatDidYouEat'
import useMealNumbers from '../../hooks/useMealNumbers'
import { useStoreState, useStoreActions } from 'easy-peasy'
import useUser from 'hooks/useUser'

const PreviewMeal = ({ foods }) => {
  const mealNumbers = useMealNumbers()
  const { userIsPremium } = useStoreState(state => state.users)

  const { previewMealFoods } = useStoreState(state => state.foods)
  const { deleteFood, updateFood } = useStoreActions(actions => actions.foods)

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = e => {
    setAnchorEl(null)
  }

  // updates food new meal
  const handleCreate = () => {
    const maxMealNumber =
      mealNumbers.length === 0 ? 0 : Math.max(...mealNumbers)

    previewMealFoods.forEach(food =>
      updateFood({ ...food, meal: maxMealNumber + 1 })
    )
  }

  // deletes foods with meal = 0
  const handleClear = () => {
    previewMealFoods.forEach(food => deleteFood(food))
  }

  // updates foods to meal = n
  const handleAddToFood = e => {
    previewMealFoods.forEach(food =>
      updateFood({ ...food, meal: e.target.value })
    )

    handleClose()
  }

  return (
    <Box mt={4}>
      <WhatDidYouEat />

      {previewMealFoods.length > 0 && (
        <Box mt={2}>
          <Card>
            <CardHeader avatar={<Avatar>P</Avatar>} title='Preview' />

            <CardContent>
              <Typography variant='body1' gutterBottom align='right'>
                {Math.round(getTotalCalories(previewMealFoods))} cal
              </Typography>
              <Foods foods={previewMealFoods} />
              {userIsPremium && <Total foods={previewMealFoods} />}
            </CardContent>

            {previewMealFoods.length > 0 && (
              <CardActions>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                  width={1}
                >
                  <Button size='small' onClick={handleClear}>
                    Clear
                  </Button>

                  <Stack direction='row' alignItems='center' spacing={2}>
                    {mealNumbers.length > 0 && (
                      <Button
                        size='small'
                        color='primary'
                        onClick={handleClick}
                      >
                        Add To Meal
                      </Button>
                    )}
                    <Menu
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      {mealNumbers
                        .filter(number => number !== 0)
                        .map(number => (
                          <MenuItem
                            key={number}
                            value={number}
                            onClick={handleAddToFood}
                          >
                            {number}
                          </MenuItem>
                        ))}
                    </Menu>
                    <Button
                      size='small'
                      color='primary'
                      variant='contained'
                      onClick={handleCreate}
                    >
                      Create
                    </Button>
                  </Stack>
                </Stack>
              </CardActions>
            )}
          </Card>
        </Box>
      )}
    </Box>
  )
}

export default PreviewMeal
