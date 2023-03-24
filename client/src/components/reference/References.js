import { Box, Card, CardContent, List, Stack, Typography } from '@mui/material'
import useIsDarkMode from 'hooks/useIsDarkMode'
import React from 'react'
import ReferenceItem from './ReferenceItem'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import Message from 'components/layout/Message'

const References = ({ references, isFiltering }) => {
  const isDarkMode = useIsDarkMode()

  return (
    <Box mt={3}>
      <Card
        sx={{
          border: isDarkMode ? '1px solid' : 'none',
          borderColor: 'divider',
        }}
      >
        <CardContent sx={{ p: 0 }}>
          {isFiltering && references.length === 0 ? (
            <Message sx={{ p: 3 } }Icon={SearchOffIcon} title='Reference not found'>
              Try again with a different search term
            </Message>
   
          ) : (
            <List sx={{ p: 0 }}>
              {references.map((reference, index) => (
                <ReferenceItem
                  key={reference._id}
                  reference={reference}
                  divider={index !== references.length - 1}
                  index={index}
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
