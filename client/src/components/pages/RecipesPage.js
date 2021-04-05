import React from 'react'
import { connect } from 'react-redux'
import Recipes from '../recipe/Recipes'
import { readRecipes } from '../../state/recipe/recipeActions'
import { readFoods } from '../../state/food/foodActions'
import NoRecipes from '../recipe/NoRecipes'
import { Container } from '@material-ui/core'

const RecipesPage = ({ readRecipes, readFoods, recipes, loading, foods }) => {
  React.useEffect(() => {
    if (recipes.length === 0) readRecipes()
    if (foods.length === 0) readFoods()
  }, [])

  if (recipes.length === 0 && loading) return <div>Loading...</div>

  if (recipes.length === 0 && !loading) return <NoRecipes />

  return (
    <Container maxWidth='md' disableGutters>
      <Recipes recipes={recipes} />
    </Container>
  )
}

const mapActionsToProps = { readRecipes, readFoods }

const mapStateToProps = state => ({
  recipes: state.recipe.recipes,
  recipesFoods: state.food.recipesFoods,
  foods: state.food.foods,
  loading: state.recipe.loading,
})

export default connect(mapStateToProps, mapActionsToProps)(RecipesPage)
