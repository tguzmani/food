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
  Divider,
} from '@mui/material'
import React from 'react'
import { getTotalCalories } from '../../util/food'
import Foods from '../food/Foods'
import Total from '../food/Total'
import WhatDidYouEat from './WhatDidYouEat'
import useMealNumbers from '../../hooks/useMealNumbers'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useDrop } from 'react-dnd'
import { useTranslation } from 'react-i18next'

const PreviewMeal = ({ foods }) => {
  const mealNumbers = useMealNumbers()
  const { userIsPremium } = useStoreState(state => state.users)

  const { previewMealFoods } = useStoreState(state => state.foods)
  const { deleteFood, updateFood } = useStoreActions(actions => actions.foods)

  const [anchorEl, setAnchorEl] = React.useState(null)

  const { t } = useTranslation()

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = e => {
    setAnchorEl(null)
  }

  // updates food new meal
  const handleCreate = () => {
    const maxMealNumber = mealNumbers.length === 0 ? 0 : Math.max(...mealNumbers)

    previewMealFoods.forEach(food => updateFood({ ...food, meal: maxMealNumber + 1 }))
  }

  // deletes foods with meal = 0
  const handleClear = () => {
    previewMealFoods.forEach(food => deleteFood(food))
  }

  // updates foods to meal = n
  const handleAddToFood = e => {
    previewMealFoods.forEach(food => updateFood({ ...food, meal: e.target.value }))

    handleClose()
  }

  const handleDropUpdateFood = food => {
    if (food.meal !== 0) updateFood({ ...food, meal: 0 })
  }

  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'food',
      drop: handleDropUpdateFood,
      collect: monitor => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    []
  )

  return (
    <Box ref={drop}>
      <WhatDidYouEat />

      {isOver && previewMealFoods.length === 0 && (
        <Box
          sx={{
            width: 1,
            backgroundColor: 'primary.lighter',
            border: '3px dashed',
            borderColor: 'primary.main',
            borderRadius: 2,
            padding: 4,
            marginTop: 2,
          }}
        >
          <Typography variant="h6" align="center" color="primary.main">
            {t('dialog.dropHereToCreateMeal')}
          </Typography>
        </Box>
      )}

      {previewMealFoods.length > 0 && (
        <Box mt={2}>
          <Card
            sx={{
              backgroundColor: isOver ? 'primary.lighter' : 'inherit',
            }}
          >
            <CardHeader avatar={<Avatar>P</Avatar>} title={t('references.preview')} />

            <CardContent>
              <Typography variant="body1" gutterBottom align="right">
                {Math.round(getTotalCalories(previewMealFoods))} cal
              </Typography>
              <Foods foods={previewMealFoods} />
              {userIsPremium && (
                <>
                  <Total foods={previewMealFoods} />
                </>
              )}
            </CardContent>

            {previewMealFoods.length > 0 && (
              <CardActions>
                <Stack direction="row" justifyContent="space-between" alignItems="center" width={1}>
                  <Button size="small" onClick={handleClear}>
                    {t('actions.clear')}
                  </Button>

                  <Stack direction="row" alignItems="center" spacing={2}>
                    {mealNumbers.length > 0 && (
                      <Button size="small" color="primary" onClick={handleClick}>
                        {t('meals.addToMeal')}
                      </Button>
                    )}
                    <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                      {mealNumbers
                        .filter(number => number !== 0)
                        .map(number => (
                          <MenuItem key={number} value={number} onClick={handleAddToFood}>
                            {number}
                          </MenuItem>
                        ))}
                    </Menu>
                    <Button size="small" color="primary" variant="contained" onClick={handleCreate}>
                      {t('actions.create')}
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
