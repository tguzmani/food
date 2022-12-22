import React from 'react'
import useFoods from '../../hooks/useFoods'
import { getAlcoholUnits } from './../../util/food'

const Cleanliness = () => {
  const foods = useFoods('meals')

  return (
    <div>
      <span role='img' aria-label='drinks'>🥃</span> {getAlcoholUnits(foods).toFixed(0)}
    </div>
  )
}

export default Cleanliness
