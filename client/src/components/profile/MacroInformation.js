import React, { useState, useEffect } from 'react'
import { Slider, TextField, Typography, Box, InputAdornment, Collapse } from '@mui/material'

import { activityOptions, activityMarks } from './activity'

import Detail from './Detail'
import { useStoreActions, useStoreState } from 'easy-peasy'
import OffsetMode from './OffsetMode'
import { useTranslation } from 'react-i18next'

const MacroInformation = () => {
  const { profile, user } = useStoreState(state => state.users)
  const { setProfile, setProfileFields } = useStoreActions(actions => actions.users)

  const { t } = useTranslation()

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
        <Detail title={t('profile.baseWeight')}>{t('profile.baseWeightDescription')}</Detail>

        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          required
          label={t('profile.baseWeight')}
          name="baseWeight"
          type="number"
          value={baseWeight}
          onChange={onChange}
          InputProps={{
            endAdornment: <InputAdornment position="end">{user?.units}</InputAdornment>,
          }}
        />
      </Box>

      <Box mb={1}>
        <Detail title={t('profile.offsetMode')}>{t('profile.offsetModeDescription')}</Detail>

        <OffsetMode offsetMode={offsetMode} onChangeOffsetMode={handleChangeOffsetMode} />
      </Box>

      <Collapse in={profile.offsetMode !== 'maintenance'}>
        <Box mb={1}>
          <Detail title={t('profile.offset')}>
            {t(offsetMode === 'surplus' ? 'profile.offsetDescriptionSurplus' : 'profile.offsetDescriptionDeficit')}
          </Detail>

          <TextField
            sx={{ mt: 2 }}
            fullWidth
            variant="outlined"
            margin="dense"
            required
            label={t('profile.offset')}
            name="offset"
            type="number"
            onChange={onChange}
            value={offset}
            InputProps={{
              endAdornment: <InputAdornment position="end">cal</InputAdornment>,
            }}
          />
        </Box>
      </Collapse>

      <Box mb={3}>
        <Detail title={t('profile.activity')}>{t('profile.activityDescription')}</Detail>

        <Slider
          value={activity}
          onChange={(e, value) => setActivity(value)}
          marks={activityMarks}
          min={1.2}
          max={1.9}
          step={null}
        />
        <Box sx={{ height: '2em' }}>
          <Typography variant="body2">{t(`profile.${activityOptions[activity]}`)}</Typography>
        </Box>
      </Box>

      <Box mb={3}>
        <Detail title={t('profile.proteinPreferences')}>{t('profile.proteinPreferenceDescription')}</Detail>
        <Slider
          data-name="proteinPref"
          value={proteinPref}
          onChange={(e, value) => setProteinPref(value)}
          marks
          min={0.7}
          max={1.5}
          step={0.1}
          valueLabelDisplay="auto"
        />
        <Typography variant="body2">{t('profile.proteinPreference', { grams: proteinPref })}</Typography>
      </Box>

      <Box mb={3}>
        <Detail title={t('profile.fatPreference')}>{t('profile.fatPreferenceDescription')}</Detail>
        <Slider
          value={fatPref}
          onChange={(e, value) => setFatPref(value)}
          marks
          min={20}
          max={40}
          step={1}
          valueLabelDisplay="auto"
        />
        <Typography variant="body2">{fatPref}%</Typography>
      </Box>
    </>
  )
}

export default MacroInformation
