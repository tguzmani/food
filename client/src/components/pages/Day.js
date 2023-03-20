import React, { useEffect, useState } from 'react'

import Meals from './../meal/Meals'
import PreviewMeal from '../meal/PreviewMeal'
import Macros from '../macro/Macros'
import useMealNumbers from './../../hooks/useMealNumbers'
import { Container, Tab, Tabs } from '@mui/material'
import { useStoreActions, useStoreState } from 'easy-peasy'
import useConditionalRead from 'hooks/useConditionalRead'
import useUser from 'hooks/useUser'
import Loading from 'components/layout/Loading'
import NoMeasurementsFoods from '../measure/NoMeasurementsFoods'
import NoReferencesFoods from 'components/reference/NoReferencesFoods'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import useResponsive from 'hooks/useResponsive'
import TabPanel from 'components/layout/TabPanel'
import MealsResumeTable from 'components/meal/MealsResumeTable'
import MealsResume from 'components/meal/MealsResume'

const Day = () => {
  const user = useUser()
  const isMobile = useResponsive('sm')

  const [value, setValue] = useState(0)
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

  const Backend = isMobile ? TouchBackend : HTML5Backend

  const dndOptions = {
    delayTouchStart: 50,
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Container disableGutters maxWidth='md'>
      <Macros />
      <DndProvider backend={Backend} options={dndOptions}>
        <Tabs
          sx={{mt: 2, mb: 3}}
          value={value}
          onChange={handleChange}
          variant="fullWidth"
        >
          <Tab label='Foods' />
          <Tab label='Meals' />
        </Tabs>
        <TabPanel value={value} index={0}>
          <>
            <PreviewMeal />
            <Meals foods={mealsFoods} mealNumbers={mealNumbers} />
          </>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <MealsResume/>
        </TabPanel>
      </DndProvider>
    </Container>
  )
}

export default Day
