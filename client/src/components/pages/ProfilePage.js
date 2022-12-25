import React from 'react'

import UserInformation from '../profile/UserInformation'
import FAB from './../layout/FAB'
import SaveIcon from '@mui/icons-material/Save'
import { useStoreActions, useStoreState } from 'easy-peasy'

const ProfilePage = () => {
  const { user, loading, profile } = useStoreState(state => state.users)
  const { updateUser } = useStoreActions(state => state.users)

  const handleSaveChanges = () => {
    updateUser(profile)
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
        tooltipTitle='Save Changes'
      />
    </div>
  )
}

export default ProfilePage
