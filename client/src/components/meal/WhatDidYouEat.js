import { TextField } from '@mui/material'
import React from 'react'
import { useStoreActions } from 'easy-peasy'

const WhatDidYouEat = () => {
  const { createFood, createManyFoods } = useStoreActions(actions => actions.foods)

  const [query, setQuery] = React.useState('')

  const onChangeQuery = e => {
    setQuery(e.target.value)
  }

  const clearQuery = () => {
    setQuery('')
  }

  const queryMatcher = query => {
    const queryArray = query.split(' ')

    const onlyFood = /^([a-zá-ú]+\s{0,1})+$/i
    const foodAndNumbers = /^([a-zá-ú]+\s[0-9]+\s{0,1})+$/i
    const foodAndCalc = /^[a-zá-ú]+\s[0-9]+\*[0-9]+(\/[0-9]+)?$/i

    if (onlyFood.test(query)) {
      const foodArray = queryArray.map(queryItem => ({
        name: queryItem.toLowerCase(),
        quantity: 0,
        meal: 0,
      }))

      createManyFoods(foodArray)

      // foodArray.forEach(food => {
      //   createFood(food)
      // })

      clearQuery()
    }

    if (foodAndNumbers.test(query)) {
      let i
      let foodArray = []

      for (i = 0; i < queryArray.length - 1; i += 2) {
        foodArray.push({
          name: queryArray[i].toLowerCase(),
          quantity: queryArray[i + 1],
          meal: 0,
        })
      }

      createManyFoods(foodArray)

      // foodArray.forEach(food => {
      //   createFood(food)
      // })

      clearQuery()
    }

    if (foodAndCalc.test(query)) {
      createFood({
        name: queryArray[0].toLowerCase(),
        // eslint-disable-next-line
        quantity: eval(queryArray[1]).toFixed(0),
        meal: 0,
      })

      clearQuery()
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    queryMatcher(query)
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        fullWidth
        label='What did you eat?'
        value={query}
        variant='outlined'
        onChange={onChangeQuery}
        className='bg-white'
      />
    </form>
  )
}

export default WhatDidYouEat
