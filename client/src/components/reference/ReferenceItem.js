import React from 'react'
import { connect } from 'react-redux'
import { ListItem, Grid, makeStyles, Box } from '@material-ui/core'
import { capitalize } from './../../util/index'
import { deleteReference } from './../../state/reference/referenceActions'

import { SwipeableListItem } from '@sandstreamdev/react-swipeable-list'
import '@sandstreamdev/react-swipeable-list/dist/styles.css'
import DeleteIcon from '@material-ui/icons/Delete'
import UpdateReferenceDialog from './UpdateReferenceDialog'

const useStyles = makeStyles(theme => ({
  root: { paddingLeft: theme.spacing(1), paddingRight: theme.spacing(1) },
  input: {
    fontSize: '14px',
  },
}))

const Value = ({ children, color }) => (
  <Grid item xs={3} style={{ textAlign: 'right', color }}>
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

const ReferenceItem = ({ reference, deleteReference, preview, divider }) => {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)

  const handleOpen = e => {
    if (!preview) setOpen(true)
  }

  const displayMacro = value => {
    if (isNaN(value)) return 0

    if (value < 1) return `${Math.round(value * 100)}%`

    return Math.round(value)
  }

  return (
    <>
      <SwipeableListItem
        swipeLeft={
          !preview && {
            content: <Delete />,
            action: () => deleteReference(reference),
          }
        }
        threshold={0.9}
      >
        <ListItem
          className={classes.root}
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
                justify='space-around'
                spacing={2}
                alignItems='center'
              >
                <Value color='red'>{displayMacro(reference.protein)}</Value>
                <Value color='blue'>{displayMacro(reference.carbs)}</Value>
                <Value color='green'>{displayMacro(reference.fat)}</Value>
                <Grid item xs={3} style={{ textAlign: 'right' }}>
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

const mapActionsToProps = { deleteReference }

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapActionsToProps)(ReferenceItem)
