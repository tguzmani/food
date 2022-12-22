import { List } from '@mui/material'
import React from 'react'
import RecipeItem from './RecipeItem'

const Recipes = ({ recipes }) => {
  return (
    <List>
      {recipes.map(recipe => (
        <RecipeItem key={recipe._id} recipe={recipe} />
      ))}
    </List>
  )
}

export default Recipes
