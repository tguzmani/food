import React from 'react'
import { ListItem, Grid, Box, Typography } from '@mui/material'
import { capitalize } from './../../util/index'

import { SwipeableListItem } from '@sandstreamdev/react-swipeable-list'
import DeleteIcon from '@mui/icons-material/Delete'
import UpdateReferenceDialog from './UpdateReferenceDialog'
import { useStoreActions } from 'easy-peasy'
import useIsDarkMode from 'hooks/useIsDarkMode'

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

const ReferenceItem = ({ reference, preview, divider }) => {
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
            ...(preview && {
              border: 1,
              borderColor: 'grey.300',
              borderRadius: 1,
            }),
            backgroundColor: 'grey.950',
            borderBottomColor: isDarkMode ? 'grey.800' : 'grey.300',
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
                <Value color='error.main'>{displayMacro(reference.protein)}</Value>
                <Value color='primary.main'>{displayMacro(reference.carbs)}</Value>
                <Value color='success.main'>{displayMacro(reference.fat)}</Value>
                <Grid item xs={3} sx={{ textAlign: 'right' }}>
                  <Typography variant='body2'>
                    {reference.isDirty && reference.isAlcohol
                      ? 'A'
                      : reference.isDirty && 'D'}
                  </Typography>
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
