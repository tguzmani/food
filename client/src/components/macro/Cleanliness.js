import React from 'react'
import { getCleanliness } from '../../util/food'
import { useStoreState } from 'easy-peasy'

const Cleanliness = () => {
  const { foods } = useStoreState(state => state.foods)
  const cleanliness = getCleanliness(foods)

  return (
    <div>
      <span role='img' aria-label='cleanliness'>
        💎
      </span>{' '}
      {!isNaN(cleanliness) && Math.round(cleanliness)}%
    </div>
  )
}

export default Cleanliness
