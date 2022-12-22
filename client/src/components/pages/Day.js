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

const Day = ({ readFoods, foodState }) => {
  return <div>Day</div>
  // const { loading: loadingFood } = foodState

  // const foods = useFoods('meals')
  // const mealNumbers = useMealNumbers()
  // const [once, setOnce] = React.useState(true)

  // React.useEffect(() => {
  //   if (foods.length === 0 && once) {
  //     readFoods()
  //     setOnce(false)
  //   }
  //   // eslint-disable-next-line
  // }, [foods])


  // return (
  //   <Container disableGutters maxWidth='md'>
  //     <Macros />
  //     <PreviewMeal />
  //     <Meals
  //       foods={foods.filter(food => food.meal !== 0)}
  //       mealNumbers={mealNumbers}
  //     />

  //     <BackdropLoading open={loadingFood} />
  //   </Container>
  // )
}

export default Day
