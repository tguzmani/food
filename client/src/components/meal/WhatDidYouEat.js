import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useTranslation } from 'react-i18next'
import NeedPremiumDialog from 'components/users/need-premium-dialog'
import useToggle from 'hooks/useToggle'

const WhatDidYouEat = () => {
  const { createFood } = useStoreActions(actions => actions.foods)
  const { userIsPremium } = useStoreState(state => state.users)

  const { value: isOpenDialog, toggleValue: toggleOpenDialog } = useToggle()

  const [query, setQuery] = React.useState('')

  const { t } = useTranslation()

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
    <>
      <NeedPremiumDialog open={isOpenDialog} onClose={toggleOpenDialog} />

      {!userIsPremium && (
        <Box
          width={1}
          borderRadius={1}
          border="1px solid"
          borderColor="grey.600"
          padding={2}
          onClick={toggleOpenDialog}
        >
          <Typography variant="body1" color="grey.600">
            {t('day.whatDidYouEat')}
          </Typography>
        </Box>
      )}

      {userIsPremium && (
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label={t('day.whatDidYouEat')}
            value={query}
            variant="outlined"
            onChange={onChangeQuery}
            className="bg-white"
          />
        </form>
      )}
    </>
  )
}

export default WhatDidYouEat
