import React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import Recipes from '../recipe/Recipes'
import { readRecipes } from '../../state/recipe/recipeActions'
import { readFoods } from '../../state/food/foodActions'
import NoRecipes from '../recipe/NoRecipes'
import { Container } from '@material-ui/core'

// const RecipesPage = ({ readRecipes, readFoods, recipes, loading, foods }) => {

const RecipesPage = () => {
  const { recipes, loading } = useSelector(state => state.recipe)
  const foods = useSelector(state => state.food.foods)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (recipes.length === 0) dispatch(readRecipes())
    if (foods.length === 0) dispatch(readFoods())
  }, [])

  if (recipes.length === 0 && loading) return <div>Loading...</div>

  if (recipes.length === 0 && !loading) return <NoRecipes />

  return (
    <Container maxWidth='md' disableGutters>
      <Recipes recipes={recipes} />
    </Container>
  )
}

// const mapActionsToProps = { readRecipes, readFoods }

// const mapStateToProps = state => ({
//   recipes: state.recipe.recipes,
//   loading: state.recipe.loading,
//   recipesFoods: state.food.recipesFoods,
//   foods: state.food.foods,
// })

// export default connect(mapStateToProps, mapActionsToProps)(RecipesPage)

export default RecipesPage
