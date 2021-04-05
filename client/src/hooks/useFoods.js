import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { readFoods } from './../state/food/foodActions'

const useFoods = which => {
  let foods = useSelector(state => state.food.foods)

  if (which === 'meals') return foods.filter(food => !food.recipe)
  if (which === 'recipes') return foods.filter(food => food.recipe !== '')
}

export default useFoods
