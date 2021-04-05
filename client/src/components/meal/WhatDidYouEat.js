import { Box, TextField } from '@material-ui/core'
import { connect } from 'react-redux'
import React from 'react'
import { createFood, createFoodsByRecipe } from './../../state/food/foodActions'

const WhatDidYouEat = ({ createFood, createFoodsByRecipe }) => {
  const [query, setQuery] = React.useState('')

  const onChangeQuery = e => {
    setQuery(e.target.value)
  }

  const queryMatcher = query => {
    const queryArray = query.split(' ')

    const onlyFood = /^([a-zá-ú]+\s{0,1})+$/
    const foodAndNumbers = /^([a-zá-ú]+\s[0-9]+\s{0,1})+$/
    const recipe = /^r:[a-zá-ú]+$/

    if (onlyFood.test(query)) {
      const foodArray = queryArray.map(queryItem => ({
        name: queryItem,
        quantity: 0,
        meal: 0,
      }))

      foodArray.forEach(food => {
        createFood(food)
      })

      setQuery('')
    }

    if (foodAndNumbers.test(query)) {
      let i
      let foodArray = []

      for (i = 0; i < queryArray.length - 1; i += 2) {
        foodArray.push({
          name: queryArray[i],
          quantity: queryArray[i + 1],
          meal: 0,
        })
      }

      foodArray.forEach(food => {
        createFood(food)
      })

      setQuery('')
    }

    if (recipe.test(query)) {
      createFoodsByRecipe({ recipeName: query.substring(2), meal: 0 })
    }
  }

  const handleOnKeyDown = e => {
    if (e.key === 'Enter' && query !== '') queryMatcher(query)
  }

  return (
    <TextField
      fullWidth
      label='What did you eat?'
      // variant='outlined'
      value={query}
      onChange={onChangeQuery}
      onKeyDown={handleOnKeyDown}
    />
  )
}

const mapActionsToProps = { createFood, createFoodsByRecipe }

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapActionsToProps)(WhatDidYouEat)
