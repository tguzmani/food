import { useStoreState } from 'easy-peasy'
import React from 'react'
import useFoods from '../../hooks/useFoods'

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
