import React, { useEffect } from 'react'
import StatPanel from '../statistics/StatPanel'
import { Container, Grid } from '@mui/material'
import { useStoreActions, useStoreState } from 'easy-peasy'
import NoMeasurementsStats from '../measure/NoMeasurementsStats'
import useConditionalRead from 'hooks/useConditionalRead'
import Loading from 'components/layout/Loading'
import UsersTable from 'components/users/UsersTable'

const UsersPage = () => {
  const { users, loading } = useStoreState(state => state.users)
  const { readUsers } = useStoreActions(actions => actions.users)

  useConditionalRead([{ name: readUsers, condition: users.length === 0 }])

  if (users.length === 0 && loading) return <Loading />

  return (
    <Container>
      <UsersTable users={users} />
    </Container>
  )
}

export default UsersPage
