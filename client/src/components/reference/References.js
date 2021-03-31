import { Box, Card, CardContent, List } from '@material-ui/core'
import { connect } from 'react-redux'
import React from 'react'
import ReferenceItem from './ReferenceItem'

const References = ({ references, filtering }) => {
  return (
    <Box mt={3}>
      <Card>
        <CardContent>
          {filtering && references.length === 0 ? (
            <div>Reference not found</div>
          ) : (
            <List>
              {references.map(reference => (
                <ReferenceItem key={reference._id} reference={reference} />
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

const mapActionsToProps = {}

const mapStateToProps = state => ({
  filtering: state.reference.filtering,
})

export default connect(mapStateToProps, mapActionsToProps)(References)
