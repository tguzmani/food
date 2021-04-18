import {
  Card,
  CardContent,
  Typography,
  Box,
  CardActions,
  Button,
  makeStyles,
  Menu,
  MenuItem,
} from '@material-ui/core'
import { connect } from 'react-redux'
import React from 'react'
import { getTotalCalories } from '../../util/food'
import Foods from '../food/Foods'
import Total from '../food/Total'
import WhatDidYouEat from './WhatDidYouEat'
import { deleteFood, updateFood } from './../../state/food/foodActions'
import useMealNumbers from './../../hooks/useMealNumbers'

const useStyles = makeStyles(theme => ({
  cardActions: {
    display: 'flex',
  },

  grow: {
    flexGrow: 1,
  },
}))

const PreviewMeal = ({ foods, updateFood, deleteFood }) => {
  const classes = useStyles()
  const mealNumbers = useMealNumbers()

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

    previewMealFoods.forEach(food => {
      updateFood({ ...food, meal: maxMealNumber + 1 })
    })
  }

  // deletes foods with meal = 0
  const handleClear = () => {
    previewMealFoods.forEach(food => {
      deleteFood(food)
    })
  }

  // updates foods to meal = n
  const handleAddToFood = e => {
    previewMealFoods.forEach(food => {
      updateFood({ ...food, meal: e.target.value })
    })

    handleClose()
  }

  const previewMealFoods = foods.filter(food => food.meal === 0)

  return (
    <Box mt={3}>
      <Card>
        <CardContent>
          <WhatDidYouEat />

          {previewMealFoods.length > 0 && (
            <>
              <Box mt={2}>
                <Typography variant='body1' gutterBottom align='right'>
                  {Math.round(getTotalCalories(previewMealFoods))} cal
                </Typography>
                <Foods foods={previewMealFoods} />
                <Total foods={previewMealFoods} />
              </Box>
            </>
          )}
        </CardContent>
        {previewMealFoods.length > 0 && (
          <CardActions className={classes.cardActions}>
            <Button size='small' onClick={handleClear}>
              Clear
            </Button>
            <div className={classes.grow}></div>
            {mealNumbers.length > 0 && (
              <Button size='small' color='primary' onClick={handleClick}>
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
                  <MenuItem value={number} onClick={handleAddToFood}>
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
          </CardActions>
        )}
      </Card>
    </Box>
  )
}

const mapActionsToProps = { updateFood, deleteFood }

const mapStateToProps = state => ({
  foods: state.food.foods,
  mealNumbers: state.food.mealNumbers,
})

export default connect(mapStateToProps, mapActionsToProps)(PreviewMeal)
