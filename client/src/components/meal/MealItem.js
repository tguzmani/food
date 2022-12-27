import {
  Card,
  CardContent,
  Typography,
  Box,
  CardHeader,
  Avatar,
  IconButton,
  MenuItem,
  useTheme
} from '@mui/material'
import React from 'react'
import { getCleanliness, getTotalCalories } from '../../util/food'
import Foods from '../food/Foods'
import Total from '../food/Total'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import Menu from '../layout/Menu'
import useMenu from 'hooks/useMenu'
import { useStoreActions } from 'easy-peasy'
import useUser from 'hooks/useUser'

const MealItem = ({ foods, number }) => {
  const { deleteFood } = useStoreActions(actions => actions.foods)
  const theme = useTheme()
  const user = useUser()
  const thisMealFoods = foods.filter(food => food.meal === number)
  
  const [anchorEl, handleOpenMenu, handleCloseMenu] = useMenu()

  const handleDeleteMeal = () => {
    thisMealFoods.forEach(food => {
      deleteFood(food)
    })
  }

  const totalCalories = Math.round(getTotalCalories(thisMealFoods))
  const cleanliness = Math.round(getCleanliness(thisMealFoods))

  return (
    <Box mt={3}>
      <Card>
        <CardHeader
          avatar={<Avatar sx={{backgroundColor: theme.palette.primary.light}}>{number}</Avatar>}
          action={
            <IconButton onClick={handleOpenMenu} size='large'>
              <MoreVertIcon />
            </IconButton>
          }
          title={`${totalCalories} cal`}
          subheader={`${cleanliness}% clean`}
        />

        <CardContent>
          <Typography variant='body1' gutterBottom align='right'></Typography>

          <Foods foods={thisMealFoods} />
          {user.isPremium && <Total foods={thisMealFoods} />}
        </CardContent>
      </Card>

      <Menu anchorEl={anchorEl} handleClose={handleCloseMenu}>
        <MenuItem onClick={handleDeleteMeal}>Delete Meal</MenuItem>
      </Menu>
    </Box>
  )
}

export default MealItem
