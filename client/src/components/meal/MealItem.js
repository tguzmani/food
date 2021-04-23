import {
  Card,
  CardContent,
  Typography,
  Box,
  CardHeader,
  Avatar,
  IconButton,
  Tooltip,
  makeStyles,
  MenuItem,
  Divider,
} from '@material-ui/core'
import React from 'react'
import { getCleanliness, getTotalCalories } from '../../util/food'
import Foods from '../food/Foods'
import Total from '../food/Total'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import RecipeDialog from '../recipe/RecipeDialog'
import Menu from '../layout/Menu'
import useMenu from './../../hooks/useMenu'
import { useDispatch } from 'react-redux'
import { deleteFood } from '../../state/food/foodActions'

const useStyles = makeStyles(theme => ({
  avatar: { backgroundColor: theme.palette.primary.light },
}))

const MealItem = ({ foods, number }) => {
  const classes = useStyles()
  const thisMealFoods = foods.filter(food => food.meal === number)
  const dispatch = useDispatch()

  const [open, setOpen] = React.useState(false)

  const [anchorEl, handleOpenMenu, handleCloseMenu] = useMenu()

  const handleCreateRecipe = () => {
    setOpen(true)
    handleCloseMenu()
  }

  const handleDeleteMeal = () => {
    thisMealFoods.forEach(food => {
      dispatch(deleteFood(food))
    })
  }

  const totalCalories = Math.round(getTotalCalories(thisMealFoods))
  const cleanliness = Math.round(getCleanliness(thisMealFoods))

  return (
    <Box mt={3}>
      <Card>
        <CardHeader
          avatar={<Avatar className={classes.avatar}>{number}</Avatar>}
          action={
            <IconButton onClick={handleOpenMenu}>
              <MoreVertIcon />
            </IconButton>
          }
          title={`${totalCalories} cal`}
          subheader={`${cleanliness}% clean`}
        />

        <CardContent>
          <Typography variant='body1' gutterBottom align='right'></Typography>

          <Foods foods={thisMealFoods} />
          <Total foods={thisMealFoods} />
        </CardContent>
      </Card>

      <Menu anchorEl={anchorEl} handleClose={handleCloseMenu}>
        <MenuItem onClick={handleCreateRecipe}>Create Recipe</MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteMeal}>Delete Meal</MenuItem>
      </Menu>

      <RecipeDialog foods={thisMealFoods} open={open} setOpen={setOpen} />
    </Box>
  )
}

export default MealItem
