import React from 'react'
import { ListItem, Grid, Box } from '@mui/material'
import { capitalize } from './../../util/index'

import { SwipeableListItem } from '@sandstreamdev/react-swipeable-list'
import DeleteIcon from '@mui/icons-material/Delete'
import UpdateReferenceDialog from './UpdateReferenceDialog'
import { useStoreActions } from 'easy-peasy'

const Value = ({ children, color }) => (
  <Grid item xs={3} sx={{ textAlign: 'right', color }}>
    {children}
  </Grid>
)

const Delete = () => (
  <Box
    width={1}
    color='secondary.contrastText'
    bgcolor='secondary.main'
    p={2}
    display='flex'
    alignItems='center'
    flexDirection='row-reverse'
  >
    Delete
    <DeleteIcon />
  </Box>
)

const ReferenceItem = ({ reference, preview, divider }) => {
  const { deleteReference } = useStoreActions(actions => actions.references)

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
          button
        >
          <Grid container spacing={2} alignItems='center'>
            <Grid item xs={6}>
              {capitalize(reference.name)}
            </Grid>

            <Grid item xs={6}>
              <Grid
                container
                justifyContent='space-around'
                spacing={2}
                alignItems='center'
              >
                <Value color='red'>{displayMacro(reference.protein)}</Value>
                <Value color='blue'>{displayMacro(reference.carbs)}</Value>
                <Value color='green'>{displayMacro(reference.fat)}</Value>
                <Grid item xs={3} sx={{ textAlign: 'right' }}>
                  <div>
                    {reference.isDirty && reference.isAlcohol
                      ? 'A'
                      : reference.isDirty && 'D'}
                  </div>
                </Grid>
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
