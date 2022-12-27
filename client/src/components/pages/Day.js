import React from 'react'

import Meals from './../meal/Meals'
import PreviewMeal from '../meal/PreviewMeal'
import Macros from '../macro/Macros'
import useMealNumbers from './../../hooks/useMealNumbers'
import { Container } from '@mui/material'
import { useStoreActions, useStoreState } from 'easy-peasy'
import useConditionalRead from 'hooks/useConditionalRead'

// import BackdropLoading from '../layout/BackdropLoading'

const Day = () => {
  const { foods, mealsFoods, loading } = useStoreState(state => state.foods)
  const { readFoods } = useStoreActions(actions => actions.foods)
  const mealNumbers = useMealNumbers()

  useConditionalRead({ name: readFoods, condition: foods.length === 0 })

  return (
    <Container disableGutters maxWidth='md'>
      <Macros />
      <PreviewMeal />
      <Meals foods={mealsFoods} mealNumbers={mealNumbers} />

      {/* <BackdropLoading open={loading && foods.length === 0} /> */}
    </Container>
  )
}

export default Day
