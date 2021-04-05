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
} from '@material-ui/core'
import React from 'react'
import { getTotalCalories } from '../../util/food'
import Foods from '../food/Foods'
import Total from '../food/Total'
import MenuBookIcon from '@material-ui/icons/MenuBook'
import RecipeDialog from '../recipe/RecipeDialog'

const useStyles = makeStyles(theme => ({
  avatar: { backgroundColor: theme.palette.primary.main },
}))

const MealItem = ({ foods, number }) => {
  const classes = useStyles()
  const thisMealFoods = foods.filter(food => food.meal === number)

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <Box mt={3}>
      <Card>
        <CardHeader
          avatar={<Avatar>{number}</Avatar>}
          action={
            <Tooltip title='Create Recipe' placement='left'>
              <IconButton onClick={handleOpen}>
                <MenuBookIcon />
              </IconButton>
            </Tooltip>
          }
          title={`${Math.round(getTotalCalories(thisMealFoods))} cal`}
        />

        <CardContent>
          <Typography variant='body1' gutterBottom align='right'></Typography>

          <Foods foods={thisMealFoods} />
          <Total foods={thisMealFoods} />
        </CardContent>
      </Card>

      <RecipeDialog foods={thisMealFoods} open={open} setOpen={setOpen} />
    </Box>
  )
}

export default MealItem
