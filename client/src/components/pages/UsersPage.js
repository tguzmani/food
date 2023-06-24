import React from 'react'
import { Container } from '@mui/material'
import { useStoreActions, useStoreState } from 'easy-peasy'
import useConditionalRead from 'hooks/useConditionalRead'
import Loading from 'components/layout/Loading'
import UsersTable from 'components/users/UsersTable'
import Page from 'components/layout/Page'

const UsersPage = () => {
  const { users, loading } = useStoreState(state => state.users)
  const { readUsers } = useStoreActions(actions => actions.users)

  useConditionalRead([{ name: readUsers, condition: users.length === 0 }])

  if (users.length === 0 && loading) return <Loading />

  return (
    <Page pathname='/users'>
      <Container sx={{ p: 0 }}>
        <UsersTable users={users} />
      </Container>
    </Page>
  )
}

export default UsersPage
