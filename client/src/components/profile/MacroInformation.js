import React, { useState, useEffect } from 'react'
import {
  Slider,
  TextField,
  Typography,
  Box,
  InputAdornment,
  Collapse,
} from '@mui/material'

import { activityOptions, activityMarks } from './activity'

import Detail from './Detail'
import { useStoreActions, useStoreState } from 'easy-peasy'
import OffsetMode from './OffsetMode'

const MacroInformation = () => {
  const { profile, user } = useStoreState(state => state.users)
  const { setProfile, setProfileFields } = useStoreActions(
    actions => actions.users
  )

  const [offsetMode, setOffsetMode] = useState(user.offsetMode || 'maintenance')

  useEffect(() => {
    if (user)
      setProfile({
        baseWeight: user.baseWeight || '',
        offset: user.offset || 0,
        proteinPref: user.proteinPref || 0.8,
        offsetMode: user.offsetMode || 'maintenance',
      })
  }, [setProfile, user])

  const [activity, setActivity] = useState(user.activity || 1.2)
  const [fatPref, setFatPref] = useState(user.fatPref || 20)
  const [proteinPref, setProteinPref] = useState(user.proteinPref || 0.8)

  useEffect(() => {
    setProfileFields({ name: 'activity', value: activity })
  }, [activity, setProfileFields])

  useEffect(() => {
    setProfileFields({ name: 'proteinPref', value: proteinPref })
  }, [proteinPref, setProfileFields])

  useEffect(() => {
    setProfileFields({ name: 'fatPref', value: fatPref })
  }, [fatPref, setProfileFields])

  if (!user) return <div>Loading...</div>

  const onChange = e => {
    const { name, value } = e.target
    setProfileFields({ name, value })
  }

  const handleChangeOffsetMode = (_, mode) => {
    if (mode !== null) {
      setOffsetMode(mode)
      setProfile({ offsetMode: mode })
    }
  }

  const { baseWeight, offset } = profile

  return (
    <>
      <Box mb={1}>
        <Detail title='Base Weight'>
          Reference weight for calculating macros. Update this field if your
          weight have changed by a significant amount. For example you lost or
          gained about 10 lb (about 4 to 5 kg).
        </Detail>

        <TextField
          fullWidth
          variant='outlined'
          margin='normal'
          required
          label='Base Weight'
          name='baseWeight'
          type='number'
          value={baseWeight}
          onChange={onChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>{user?.units}</InputAdornment>
            ),
          }}
        />
      </Box>

      <Box mb={1}>
        <Detail title='Offset Mode'>
          Select deficit, maintenance or surplus mode. If you're aiming for
          weight loss, select deficit. If you're aiming for muscle gains, select
          surplus. If you're maintaining your weight, select maintenance.
        </Detail>

        <OffsetMode
          offsetMode={offsetMode}
          onChangeOffsetMode={handleChangeOffsetMode}
        />
      </Box>

      <Collapse in={profile.offsetMode !== 'maintenance'}>
        <Box mb={1}>
          <Detail title='Offset'>
            If you're aiming for weight loss, use values between -1000 to -300.
            If you're aiming for muscle gains, use values between 300 to 500.
            These are general guidelines. Everyone is different, therefore your
            values could be different.
          </Detail>

          <TextField
            fullWidth
            variant='outlined'
            margin='dense'
            required
            label='Offset'
            name='offset'
            type='number'
            onChange={onChange}
            value={offset}
            InputProps={{
              endAdornment: <InputAdornment position='end'>cal</InputAdornment>,
            }}
          />
        </Box>
      </Collapse>

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
        <Box sx={{ height: '2em' }}>
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
          min={0.7}
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
