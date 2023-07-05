import React, { useEffect } from 'react'
import { InputAdornment, TextField } from '@mui/material'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { useTranslation } from 'react-i18next'

const PersonalInformation = () => {
  const { profile, user } = useStoreState(state => state.users)
  const { setProfile, setProfileFields } = useStoreActions(actions => actions.users)

  const { t } = useTranslation()

  useEffect(() => {
    if (user) setProfile({ age: user.age, height: user.height || '', sex: user.sex })
    // eslint-disable-next-line
  }, [])

  if (!user) return <div>Loading...</div>

  const onChange = e => {
    const { name, value } = e.target
    setProfileFields({ name, value })
  }

  return (
    <form>
      <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        required
        label={t('profile.height')}
        name="height"
        onChange={onChange}
        value={profile.height}
        type="number"
        InputProps={{
          endAdornment: <InputAdornment position="end">cm</InputAdornment>,
        }}
      />
    </form>
  )
}

export default PersonalInformation
