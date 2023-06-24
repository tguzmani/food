import React, { useState } from 'react'

import UserInformation from '../profile/UserInformation'
import FAB from './../layout/FAB'
import SaveIcon from '@mui/icons-material/Save'
import { useStoreActions, useStoreState } from 'easy-peasy'
import Page from 'components/layout/Page'
import { Box, List, ListItem } from '@mui/material'

const SettingsPage = () => {
  const { user, loading, profile } = useStoreState(state => state.users)
  const { updateUser } = useStoreActions(state => state.users)

  if (!user) return <div>Loading...</div>

  return (
    <Page pathname='/profile'>
      <Box mb={4}>
        <List>
          <ListItem>Hola</ListItem>
        </List>
      </Box>
    </Page>
  )
}

export default SettingsPage
