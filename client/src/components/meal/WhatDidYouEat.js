import { Box, TextField } from '@material-ui/core'
import { connect } from 'react-redux'
import React from 'react'
import { createFood, createFoodsByRecipe } from './../../state/food/foodActions'

const WhatDidYouEat = ({ createFood, createFoodsByRecipe }) => {
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
    const recipe = /^r:[a-zá-ú]+$/i

    if (onlyFood.test(query)) {
      const foodArray = queryArray.map(queryItem => ({
        name: queryItem.toLowerCase(),
        quantity: 0,
        meal: 0,
      }))

      foodArray.forEach(food => {
        createFood(food)
      })

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

      foodArray.forEach(food => {
        createFood(food)
      })

      clearQuery()
    }

    if (recipe.test(query)) {
      createFoodsByRecipe({ recipeName: query.substring(2), meal: 0 })
      clearQuery()
    }

    if (foodAndCalc.test(query)) {
      createFood({
        name: queryArray[0].toLowerCase(),
        quantity: eval(queryArray[1]),
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

const mapActionsToProps = { createFood, createFoodsByRecipe }

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapActionsToProps)(WhatDidYouEat)
