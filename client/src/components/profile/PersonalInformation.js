import React, { useEffect } from 'react'
import { TextField } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { setFields, setState } from './../../state/profile/profileActions'
import useUser from 'hooks/useUser'

const PersonalInformation = () => {
  const user = useUser()
  // const profile = useSelector(state => state.profile)
  const profile = {}

  // useEffect(() => {
  //   if (user)
  //     dispatch(setState({ age: user.age, height: user.height, sex: user.sex }))
  //     // eslint-disable-next-line
  // }, [])

  if (!user) return <div>Loading...</div>

  const onChange = e => {
    const { name, value } = e.target
    // dispatch(setFields(name, value))
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
