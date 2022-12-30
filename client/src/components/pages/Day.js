import React, { useEffect, useState } from 'react'

import Meals from './../meal/Meals'
import PreviewMeal from '../meal/PreviewMeal'
import Macros from '../macro/Macros'
import useMealNumbers from './../../hooks/useMealNumbers'
import { Container } from '@mui/material'
import { useStoreActions, useStoreState } from 'easy-peasy'
import useConditionalRead from 'hooks/useConditionalRead'
import useUser from 'hooks/useUser'
import Loading from 'components/layout/Loading'
import NoMeasurementsFoods from '../measure/NoMeasurementsFoods'
import NoReferencesFoods from 'components/reference/NoReferencesFoods'

const Day = () => {
  const user = useUser()
  const { foods, mealsFoods, loading } = useStoreState(state => state.foods)
  const { measurements, loading: loadingMeasurements } = useStoreState(
    state => state.measurements
  )
  const { references, loading: loadingReferences } = useStoreState(
    state => state.references
  )

  const { readFoods } = useStoreActions(actions => actions.foods)
  const { readMeasurements } = useStoreActions(actions => actions.measurements)
  const { readReferences } = useStoreActions(actions => actions.references)
  const mealNumbers = useMealNumbers()

  const [foodsRead, setFoodsRead] = useState(false)

  useConditionalRead([
    { name: readFoods, condition: foods.length === 0 },
    { name: readMeasurements, condition: measurements.length === 0 },
    { name: readReferences, condition: references.length === 0 },
  ])

  useEffect(() => {
    if (!loading) setFoodsRead(true)
  }, [loading])

  if (foods.length === 0 && loading && !foodsRead) return <Loading />

  if (measurements.length === 0 && !loadingMeasurements)
    return <NoMeasurementsFoods />

  if (references.length === 0 && !loadingReferences)
    return <NoReferencesFoods />

  return (
    <Container disableGutters maxWidth='md'>
      <Macros />
      <PreviewMeal />
      <Meals foods={mealsFoods} mealNumbers={mealNumbers} />
    </Container>
  )
}

export default Day
