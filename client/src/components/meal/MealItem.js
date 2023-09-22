import {
  Card,
  CardContent,
  Typography,
  Box,
  CardHeader,
  Avatar,
  IconButton,
  MenuItem,
  Divider,
} from '@mui/material'
import React from 'react'
import { getCleanliness, getTotalCalories } from '../../util/food'
import Foods from '../food/Foods'
import Total from '../food/Total'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '../layout/Menu'
import useMenu from 'hooks/useMenu'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useDrop } from 'react-dnd'
import { useTranslation } from 'react-i18next'

const MealItem = ({ foods, number }) => {
  const { deleteFood, updateFood } = useStoreActions(actions => actions.foods)
  const { userIsPremium } = useStoreState(state => state.users)
  const thisMealFoods = foods.filter(food => food.meal === number)
  const { t } = useTranslation()

  const [anchorEl, handleOpenMenu, handleCloseMenu] = useMenu()

  const handleDeleteMeal = () => {
    thisMealFoods.forEach(food => {
      deleteFood(food)
    })
  }

  const totalCalories = Math.round(getTotalCalories(thisMealFoods))
  const cleanliness = Math.round(getCleanliness(thisMealFoods))

  const handleDropUpdateFood = food => {
    if (food.meal !== number) updateFood({ ...food, meal: number })
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
    <Box mt={6}>
      <Card
        ref={drop}
        sx={{
          backgroundColor: isOver ? 'primary.lighter' : 'inherit',
          borderRadius: 1.5
        }}
      >
        <CardHeader
          sx={{p: 3, pb: 0}}
          avatar={
            <Avatar sx={{ backgroundColor: 'primary.light' }}>{number}</Avatar>
          }
          action={
            thisMealFoods.length > 0 && (
              <IconButton onClick={handleOpenMenu} >
                <MoreVertIcon />
              </IconButton>
            )
          }
          title={`${totalCalories} cal`}
          subheader={thisMealFoods.length > 0 && `${cleanliness}% ${t('meals.clean')}`}
        />

        <CardContent>
          {thisMealFoods.length === 0 ? (
            <Typography variant="body2" align="center" className="text-muted">
              {t('dialog.noFoodInMeal')}
            </Typography>
          ) : (
            <Foods foods={thisMealFoods} />
          )}

          {userIsPremium && thisMealFoods.length > 0 && (
            <>
              <Total foods={thisMealFoods} />
            </>
          )}
        </CardContent>
      </Card>

      <Menu anchorEl={anchorEl} handleClose={handleCloseMenu}>
        <MenuItem onClick={handleDeleteMeal}>{t('meals.deleteMeal')}</MenuItem>
      </Menu>
    </Box>
  )
}

export default MealItem
