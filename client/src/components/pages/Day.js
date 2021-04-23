import React from 'react'
import { connect, useSelector } from 'react-redux'

import { readFoods } from '../../state/food/foodActions'
import Meals from './../meal/Meals'
import BackdropLoading from '../layout/BackdropLoading'
import PreviewMeal from '../meal/PreviewMeal'
import Macros from '../macro/Macros'
import useFoods from './../../hooks/useFoods'
import useMealNumbers from './../../hooks/useMealNumbers'
import { Container, Grid } from '@material-ui/core'

const Day = ({ readFoods, foodState }) => {
  const { loading: loadingFood } = foodState

  const foods = useFoods('meals')
  const mealNumbers = useMealNumbers()
  const [once, setOnce] = React.useState(true)

  React.useEffect(() => {
    if (foods.length === 0 && once) {
      readFoods()
      setOnce(false)
    }
  }, [foods])

  // if (foods.length === 0 && loadingFood)
  //   return <BackdropLoading open={loadingFood} />

  return (
    <Container disableGutters maxWidth='md'>
      <Macros />
      <PreviewMeal />
      <Meals
        foods={foods.filter(food => food.meal !== 0)}
        mealNumbers={mealNumbers}
      />

      <BackdropLoading open={loadingFood} />
    </Container>
  )
}

const mapActionsToProps = { readFoods }

const mapStateToProps = state => ({
  foodState: state.food,
})

export default connect(mapStateToProps, mapActionsToProps)(Day)
