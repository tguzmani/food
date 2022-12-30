import React from 'react'
import SearchReference from '../reference/SearchReference'
import References from '../reference/References'
import { Container } from '@mui/material'
import { useStoreActions, useStoreState } from 'easy-peasy'
import useConditionalRead from 'hooks/useConditionalRead'
import Loading from 'components/layout/Loading'
import NewReferenceDialog from 'components/reference/NewReferenceDialog'
import NoReferences from 'components/reference/NoReferences'

const ReferencesPage = () => {
  const { readReferences } = useStoreActions(actions => actions.references)
  const { references, isFiltering, filteredReferences, loading } =
    useStoreState(state => state.references)

  useConditionalRead([{
    name: readReferences,
    condition: references.length === 0,
  }])

  if (references.length === 0 && loading) return <Loading />

  return (
    <Container disableGutters maxWidth='md'>
      {references.length === 0 && !loading ? (
        <NoReferences />
      ) : (
        <>
          <SearchReference />
          <References
            references={isFiltering ? filteredReferences : references}
            isFiltering={isFiltering}
          />{' '}
        </>
      )}

      <NewReferenceDialog />
    </Container>
  )
}

export default ReferencesPage
