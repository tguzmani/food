import {
  Card,
  CardContent,
  Typography,
  Box,
  CardHeader,
  Avatar,
  IconButton,
  MenuItem,
  useTheme,
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
import useUser from 'hooks/useUser'
import { useDrop } from 'react-dnd'

const MealItem = ({ foods, number }) => {
  const { deleteFood, updateFood } = useStoreActions(actions => actions.foods)
  const theme = useTheme()
  const { userIsPremium } = useStoreState(state => state.users)
  const thisMealFoods = foods.filter(food => food.meal === number)

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
    <Box mt={3}>
      <Card
        ref={drop}
        sx={{
          backgroundColor: isOver ? 'primary.lighter' : 'inherit',
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ backgroundColor: 'primary.light' }}>{number}</Avatar>
          }
          action={
            thisMealFoods.length > 0 && <IconButton onClick={handleOpenMenu} size='large'>
              <MoreVertIcon />
            </IconButton>
          }
          title={`${totalCalories} cal`}
          subheader={thisMealFoods.length > 0 && `${cleanliness}% clean`}
        />

        <CardContent>
          {thisMealFoods.length === 0 ? (
            <Typography variant='body2' align='center' className='text-muted'>
              No foods in this meal
            </Typography>
          ) : (
            <Foods foods={thisMealFoods} />
          )}

          {userIsPremium && thisMealFoods.length > 0 && (
            <>
              <Divider sx={{mb: 1}} />
              <Total foods={thisMealFoods} />
            </>
          )}
        </CardContent>
      </Card>

      <Menu anchorEl={anchorEl} handleClose={handleCloseMenu}>
        <MenuItem onClick={handleDeleteMeal}>Delete Meal</MenuItem>
      </Menu>
    </Box>
  )
}

export default MealItem
