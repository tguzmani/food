import { Box, Card, CardContent, List } from '@mui/material'
import React from 'react'
import ReferenceItem from './ReferenceItem'

const References = ({ references, isFiltering }) => {

  return (
    <Box mt={3}>
      <Card>
        <CardContent>
          {isFiltering && references.length === 0 ? (
            <div>Reference not found</div>
          ) : (
            <List>
              {references.map((reference, index) => (
                <ReferenceItem
                  key={reference._id}
                  reference={reference}
                  divider={index !== references.length - 1}
                />
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Box>
  )
}

export default References
