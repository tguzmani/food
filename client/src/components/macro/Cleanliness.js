import React from 'react'
import { getCleanliness } from '../../util/food'
import useFoods from './../../hooks/useFoods'

const Cleanliness = () => {
  const foods = useFoods('meals')
  const cleanliness = getCleanliness(foods)

  return (
    <div>
      <span role='img'>💎</span>{' '}
      {!isNaN(cleanliness) && Math.round(cleanliness)}%
    </div>
  )
}

export default Cleanliness
