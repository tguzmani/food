import React from 'react'
import { connect } from 'react-redux'

import { readFoods } from '../../state/food/foodActions'
import Meals from './../meal/Meals'
import BackdropLoading from '../layout/BackdropLoading'
import PreviewMeal from '../meal/PreviewMeal'
import Macros from '../macro/Macros'

const Day = ({ readFoods, foodState }) => {
  const { foods, loading: loadingFood, mealNumbers } = foodState

  React.useEffect(() => {
    if (foods.length === 0) readFoods()
  }, [foods.length, readFoods])

  if (foods.length === 0 && loadingFood)
    return <BackdropLoading open={loadingFood} />

  return (
    <div>
      <Macros />
      <PreviewMeal />
      <Meals
        foods={foods.filter(food => food.meal !== 0)}
        mealNumbers={mealNumbers.filter(number => number !== 0)}
      />
      <BackdropLoading open={loadingFood} />
    </div>
  )
}

const mapActionsToProps = { readFoods }

const mapStateToProps = state => ({
  foodState: state.food,
})

export default connect(mapStateToProps, mapActionsToProps)(Day)
