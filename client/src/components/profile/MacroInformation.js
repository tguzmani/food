import React, { useState, useEffect, useRef } from 'react'
import { Slider, TextField, Typography, Box } from '@material-ui/core'

import { useSelector, useDispatch } from 'react-redux'
import { activityOptions, activityMarks } from './activity'

import { setFields, setState } from './../../state/profile/profileActions'

import Detail from './Detail'

const MacroInformation = () => {
  const user = useSelector(state => state.auth.user)
  const profile = useSelector(state => state.profile)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user)
      dispatch(
        setState({
          baseWeight: user.baseWeight,
          offset: user.offset,
          proteinPref: user.proteinPref,
        })
      )
  }, [])

  const [activity, setActivity] = useState(user.activity || 1.2)
  const [fatPref, setFatPref] = useState(user.fatPref || 20)
  const [proteinPref, setProteinPref] = useState(user.proteinPref || 0.8)

  useEffect(() => {
    dispatch(setFields('activity', activity))
  }, [activity])

  useEffect(() => {
    dispatch(setFields('proteinPref', proteinPref))
  }, [proteinPref])

  useEffect(() => {
    dispatch(setFields('fatPref', fatPref))
  }, [fatPref])

  if (!user) return <div>Loading...</div>

  const onChange = e => {
    const { name, value } = e.target
    dispatch(setFields(name, value))
  }

  const { baseWeight, offset } = profile

  return (
    <>
      <Box mb={1}>
        <Detail title='Base Weight'>
          Reference weight for calculating macros. It should be only if your
          current weight is very differente than this base weight. For example,
          you lost or gained about 10 lb (4.54 kg).
        </Detail>

        <TextField
          variant='outlined'
          margin='normal'
          required
          label='Base Weight'
          name='baseWeight'
          type='number'
          value={baseWeight}
          onChange={onChange}
        />
      </Box>

      <Box mb={1}>
        <Detail title='Offset'>
          If you're aiming for weight loss, use values between -1000 to -300. If
          you're aiming for muscle gains, use values between 300 to 500. This
          are general guidelines. Everyone is different, therefore your values
          could be different.
        </Detail>

        <TextField
          variant='outlined'
          margin='normal'
          required
          label='Offset'
          name='offset'
          onChange={onChange}
          value={offset}
          type='number'
        />
      </Box>

      <Box mb={3}>
        <Detail title='Activity'>
          This cover how many times you exercise per week, how intense and also
          if your work involves physical activity or not.
        </Detail>

        <Slider
          value={activity}
          onChange={(e, value) => setActivity(value)}
          marks={activityMarks}
          min={1.2}
          max={1.9}
          step={null}
        />
        <Box style={{ height: '2em' }}>
          <Typography>{activityOptions[activity]}</Typography>
        </Box>
      </Box>

      <Box mb={3}>
        <Detail title='Protein Preference'>
          If you like eating protein, then you can pick higher values. More
          protein intake translates in less carbohydrates intake.
        </Detail>
        <Slider
          data-name='proteinPref'
          value={proteinPref}
          onChange={(e, value) => setProteinPref(value)}
          marks
          min={0.8}
          max={1.5}
          step={0.1}
          valueLabelDisplay='auto'
        />
        <Typography>{proteinPref} g per lb of base weight</Typography>
      </Box>

      <Box mb={3}>
        <Detail title='Fat Preference'>
          If you like eating fats, then you can pick higher values. More fat
          intake translates in less carbohydrates intake.
        </Detail>
        <Slider
          value={fatPref}
          onChange={(e, value) => setFatPref(value)}
          marks
          min={20}
          max={40}
          step={1}
          valueLabelDisplay='auto'
        />
        <Typography>{fatPref}%</Typography>
      </Box>
    </>
  )
}

export default MacroInformation
