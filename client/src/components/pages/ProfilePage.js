import React from 'react'

import UserInformation from '../profile/UserInformation'
import FAB from './../layout/FAB'
import SaveIcon from '@mui/icons-material/Save'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Page from 'components/layout/Page'

const ProfilePage = () => {
  const { user, loading, profile } = useStoreState(state => state.users)
  const { updateUser } = useStoreActions(state => state.users)

  const handleSaveChanges = () => {
    updateUser(profile)
  }

  if (!user) return <div>Loading...</div>

  const showFAB =
    Object.keys(profile).some(key => profile[key] !== user[key]) &&
    Object.keys(profile).every(key => profile[key] !== '')

  return (
    <Page pathname='/profile'>
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
    </Page>
  )
}

export default ProfilePage
