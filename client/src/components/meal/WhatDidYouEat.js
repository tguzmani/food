import { Box, TextField } from '@material-ui/core'
import { connect } from 'react-redux'
import React from 'react'
import { createFood } from './../../state/food/foodActions'

const WhatDidYouEat = ({ createFood }) => {
  const [query, setQuery] = React.useState('')

  const onChangeQuery = e => {
    setQuery(e.target.value)
  }

  const queryMatcher = query => {
    const queryArray = query.split(' ')

    const onlyFood = /^([a-z]+\s{0,1})+$/
    const foodAndNumbers = /^([a-z]+\s[0-9]+\s{0,1})+$/

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

const mapActionsToProps = { createFood }

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapActionsToProps)(WhatDidYouEat)
