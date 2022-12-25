import React, { useEffect } from 'react'
import { TextField } from '@mui/material'
import { useStoreState, useStoreActions } from 'easy-peasy'

const PersonalInformation = () => {
  const { profile, user } = useStoreState(state => state.users)
  const { setProfile, setProfileFields } = useStoreActions(
    actions => actions.users
  )

  useEffect(() => {
    if (user) setProfile({ age: user.age, height: user.height, sex: user.sex })
    // eslint-disable-next-line
  }, [])

  if (!user) return <div>Loading...</div>

  const onChange = e => {
    const { name, value } = e.target
    setProfileFields({ name, value })
  }

  const { age, height } = profile

  return (
    <form>
      <TextField
        variant='outlined'
        margin='normal'
        required
        label='Age'
        name='age'
        type='number'
        value={age}
        onChange={onChange}
      />

      <TextField
        variant='outlined'
        margin='normal'
        required
        label='Height (cm)'
        name='height'
        onChange={onChange}
        value={height}
        type='number'
      />
    </form>
  )
}

export default PersonalInformation
