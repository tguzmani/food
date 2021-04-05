import React from 'react'
import { getCleanliness } from '../../util/food'
import useFoods from './../../hooks/useFoods'

const Cleanliness = () => {
  const foods = useFoods('meals')

  return (
    <div>
      <span role='img'>💎</span> {Math.round(getCleanliness(foods))}%
    </div>
  )
}

export default Cleanliness
