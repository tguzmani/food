import { connect } from 'react-redux'
import {
  Card,
  CardContent,
  Typography,
  Box,
  CardHeader,
  Avatar,
  IconButton,
  Tooltip,
} from '@material-ui/core'
import React from 'react'
import { getTotalCalories } from '../../util/food'
import Foods from '../food/Foods'
import Total from '../food/Total'
import DeleteIcon from '@material-ui/icons/Delete'
import RecipeDialog from './RecipeDialog'
import useFoods from './../../hooks/useFoods'
import { capitalize } from './../../util/index'
import { deleteRecipe } from './../../state/recipe/recipeActions'

const RecipeItem = ({ recipe, deleteRecipe }) => {
  const foods = useFoods('recipes')

  const thisRecipeFoods = foods.filter(food => food.recipe === recipe._id)

  const [open, setOpen] = React.useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  return (
    <Box mt={3}>
      <Card>
        <CardHeader
          avatar={<Avatar>{capitalize(recipe.name).substring(0, 1)}</Avatar>}
          action={
            <Tooltip title='Create Recipe' placement='left'>
              <IconButton onClick={() => deleteRecipe(recipe)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          }
          title={capitalize(recipe.name)}
          subheader={`${Math.round(getTotalCalories(thisRecipeFoods))} cal`}
        />

        <CardContent>
          <Typography variant='body1' gutterBottom align='right'></Typography>

          <Foods foods={thisRecipeFoods} />
          <Total foods={thisRecipeFoods} />
        </CardContent>
      </Card>

      <RecipeDialog foods={thisRecipeFoods} open={open} setOpen={setOpen} />
    </Box>
  )
}

const mapActionsToProps = { deleteRecipe }

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapActionsToProps)(RecipeItem)
