import React from 'react'
import {useDispatch, useSelector } from 'react-redux'
import Recipes from '../recipe/Recipes'
import { readRecipes } from '../../state/recipe/recipeActions'
import { readFoods } from '../../state/food/foodActions'
import NoRecipes from '../recipe/NoRecipes'
import { Container } from '@mui/material'

const RecipesPage = () => {
  const { recipes, loading } = useSelector(state => state.recipe)
  const foods = useSelector(state => state.food.foods)
  const dispatch = useDispatch()

  React.useEffect(() => {
    if (recipes.length === 0) dispatch(readRecipes())
    if (foods.length === 0) dispatch(readFoods())
    // eslint-disable-next-line
  }, [])

  if (recipes.length === 0 && loading) return <div>Loading...</div>

  if (recipes.length === 0 && !loading) return <NoRecipes />

  return (
    <Container maxWidth='md' disableGutters>
      <Recipes recipes={recipes} />
    </Container>
  )
}

export default RecipesPage
