import React from 'react'
import { ListItem, Grid, Box, Typography, Stack } from '@mui/material'
import { capitalize } from './../../util/index'

import { SwipeableListItem } from '@sandstreamdev/react-swipeable-list'
import DeleteIcon from '@mui/icons-material/Delete'
import UpdateReferenceDialog from './UpdateReferenceDialog'
import { useStoreActions } from 'easy-peasy'
import useIsDarkMode from 'hooks/useIsDarkMode'
import DirtyIndicator from 'components/food/DirtyIndicator'

const Value = ({ children, color }) => (
  <Grid item xs={3} sx={{ textAlign: 'right', color }}>
    <Typography variant='body2'>{children}</Typography>
  </Grid>
)

const Delete = () => (
  <Box
    width={1}
    p={2}
    color='secondary.contrastText'
    bgcolor='secondary.main'
    display='flex'
    alignItems='center'
    flexDirection='row-reverse'
  >
    Delete
    <DeleteIcon />
  </Box>
)

const ReferenceItem = ({ reference, preview, divider, index }) => {
  const { deleteReference } = useStoreActions(actions => actions.references)
  const isDarkMode = useIsDarkMode()

  const [open, setOpen] = React.useState(false)

  const handleOpen = e => {
    if (!preview) setOpen(true)
  }

  const displayMacro = value => {
    if (isNaN(value)) return 0

    if (value < 1) return `${Math.round(value * 100)}%`

    return Math.round(value)
  }

  const handleDeleteReference = () => deleteReference(reference)

  const backgroundColor = index => {
    if (isDarkMode) {
      if (index % 2 === 0) return 'grey.950'
      return 'background.default'
    }

    if (!isDarkMode) {
      if (index % 2 === 0) return 'inherit'
      return 'grey.100'
    }

    return 'inherit'
  }

  return (
    <>
      <SwipeableListItem
        swipeLeft={
          !preview && {
            content: <Delete />,
            action: handleDeleteReference,
          }
        }
        threshold={0.9}
      >
        <ListItem
          divider={divider}
          onClick={handleOpen}
          button={!preview}
          sx={{
            backgroundColor: backgroundColor(index),
            '&:hover': {
              backgroundColor: isDarkMode ? 'grey.700' : 'grey.300',
            },
          }}
        >
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={5}>
              <Typography variant='body2'>
                {capitalize(reference.name)}
              </Typography>
            </Grid>

            <Grid item xs={7}>
              <Grid
                container
                justifyContent='space-around'
                spacing={2}
                alignItems='center'
              >
                <Value color='error.main'>
                  {displayMacro(reference.protein)}
                </Value>
                <Value color='primary.main'>
                  {displayMacro(reference.carbs)}
                </Value>
                <Value color='success.main'>
                  {displayMacro(reference.fat)}
                </Value>
                <Stack
                  component={Grid}
                  item
                  xs={3}
                  sx={{ textAlign: 'center' }}
                  direction='row'
                  spacing={1}
                  justifyContent='center'
                  alignItems='center'
                >
                  {reference.isDirty && <DirtyIndicator />}
                  {reference.isAlcohol && (
                    <Typography variant='body2'>A</Typography>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </ListItem>
      </SwipeableListItem>

      <UpdateReferenceDialog
        open={open}
        setOpen={setOpen}
        initalReference={reference}
      />
    </>
  )
}

export default ReferenceItem
