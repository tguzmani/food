import React from 'react'

import UserInformation from '../profile/UserInformation'
import FAB from './../layout/FAB'
import SaveIcon from '@material-ui/icons/Save'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from './../../state/auth/authActions'

const ProfilePage = () => {
  const profile = useSelector(state => state.profile)
  const { user, loading } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const handleSaveChanges = () => {
    dispatch(updateUser(profile))
  }

  if (!user) return <div>Loading...</div>

  const showFAB =
    user.age !== profile.age ||
    user.height !== profile.height ||
    user.baseWeight !== profile.baseWeight ||
    user.offset !== profile.offset ||
    user.activity !== profile.activity ||
    user.proteinPref !== profile.proteinPref ||
    user.fatPref !== profile.fatPref

  return (
    <div>
      <UserInformation />
      <FAB
        Icon={SaveIcon}
        show={showFAB}
        onClick={handleSaveChanges}
        disabled={loading}
      />
    </div>
  )
}

export default ProfilePage
