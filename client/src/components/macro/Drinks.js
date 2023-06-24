import { useStoreState } from 'easy-peasy'
import React from 'react'

const Cleanliness = () => {
  const { alcoholUnits } = useStoreState(state => state.foods)

  return (
    <div>
      <span role='img' aria-label='drinks'>
        🥃
      </span>{' '}
      {alcoholUnits.toFixed(2)}
    </div>
  )
}

export default Cleanliness
