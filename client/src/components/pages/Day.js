import React from 'react'
import { connect } from 'react-redux'

import { readFoods } from '../../state/food/foodActions'
import Meals from './../meal/Meals'
import BackdropLoading from '../layout/BackdropLoading'
import PreviewMeal from '../meal/PreviewMeal'
import Macros from '../macro/Macros'
import useFoods from './../../hooks/useFoods'
import useMealNumbers from './../../hooks/useMealNumbers'
import { Container } from '@mui/material'
import { useStoreActions, useStoreState } from 'easy-peasy'
import useConditionalRead from 'hooks/useConditionalRead'

const Day = () => {
  const { foods, mealsFoods, loading } = useStoreState(state => state.foods)
  const { readFoods } = useStoreActions(actions => actions.foods)
  const mealNumbers = useMealNumbers()

  useConditionalRead({ name: readFoods, condition: foods.length === 0 })

  return (
    <Container disableGutters maxWidth='md'>
      <Macros />
      <PreviewMeal />
      <Meals
        foods={mealsFoods}
        mealNumbers={mealNumbers}
      />

      {/* <BackdropLoading open={loading && foods.length === 0} /> */}
    </Container>
  )
}

export default Day
