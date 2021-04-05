import React from 'react'
import useFoods from '../../hooks/useFoods'
import { getAlcoholUnits } from './../../util/food'

const Cleanliness = () => {
  const foods = useFoods('meals')

  return (
    <div>
      <span role='img'>🥃</span> {getAlcoholUnits(foods)}
    </div>
  )
}

export default Cleanliness
