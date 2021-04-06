import React from 'react'

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core'

import { connect } from 'react-redux'
import { createRecipe } from './../../state/recipe/recipeActions'
import { readFoods } from './../../state/food/foodActions'

const RecipeDialog = ({
  open,
  setOpen,
  foods,
  initialName,
  createRecipe,
  readFoods,
}) => {
  const handleClose = () => {
    setOpen(false)
  }

  const onChange = e => {
    setName(e.target.value)
  }

  const handleCreateRecipe = () => {
    createRecipe({ foods, name: name.toLowerCase() })
    readFoods()
    handleClose()
  }

  const [name, setName] = React.useState(initialName || '')

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{initialName ? 'Rename' : 'Name'} Recipe</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          name={name}
          onChange={onChange}
          label='Recipe Name'
          type='text'
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button
          onClick={handleClose}
          color='primary'
          disabled={name === ''}
          onClick={handleCreateRecipe}
        >
          {initialName ? 'Update' : 'Add'} Recipe
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const mapActionsToProps = { createRecipe, readFoods }

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapActionsToProps)(RecipeDialog)
