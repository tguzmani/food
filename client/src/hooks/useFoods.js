import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { readFoods } from './../state/food/foodActions'

const useFoods = which => {
  const dispatch = useDispatch()

  let foods = useSelector(state => state.food.foods)

  useEffect(() => {
    if (foods.length === 0) dispatch(readFoods())
  }, [])

  if (which === 'meals') return foods.filter(food => !food.recipe)
  if (which === 'recipes') return foods.filter(food => food.recipe !== '')
}

export default useFoods
