import React from 'react'
import { connect } from 'react-redux'
import {
  ListItem,
  Grid,
  Divider,
  makeStyles,
  Input,
  Box,
} from '@material-ui/core'
import { capitalize } from './../../util/index'
import {
  updateFood,
  deleteFood,
  softUpdateFood,
} from './../../state/food/foodActions'
import { SwipeableListItem } from '@sandstreamdev/react-swipeable-list'
import '@sandstreamdev/react-swipeable-list/dist/styles.css'
import DeleteIcon from '@material-ui/icons/Delete'

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

const FoodItem = ({ food, softUpdateFood, updateFood, deleteFood }) => {
  const [quantity, setQuantity] = React.useState(food.quantity)
  const classes = useStyles()
  const { protein, carbs, fat } = food.reference ? food.reference : food.ref

  const onChangeQuantity = e => {
    setQuantity(parseFloat(e.target.value))
  }

  const onBlurUpdate = e => {
    updateFood(
      {
        ...food,
        quantity: isNaN(quantity) ? 0 : quantity,
        protein: isNaN(protein * quantity) ? 0 : protein * quantity,
        carbs: isNaN(carbs * quantity) ? 0 : carbs * quantity,
        fat: isNaN(fat * quantity) ? 0 : fat * quantity,
      },
      false
    )

    if (isNaN(quantity)) setQuantity(0)
  }

  React.useEffect(() => {
    if (quantity !== food.quantity)
      softUpdateFood({
        ...food,
        quantity: isNaN(quantity) ? 0 : quantity,
        protein: isNaN(protein * quantity) ? 0 : protein * quantity,
        carbs: isNaN(carbs * quantity) ? 0 : carbs * quantity,
        fat: isNaN(fat * quantity) ? 0 : fat * quantity,
      })
  }, [quantity])

  return (
    <SwipeableListItem
      swipeLeft={{
        content: <Delete />,
        action: () => deleteFood(food),
      }}
      threshold={0.8}
    >
      <ListItem className={classes.root} divider>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={5}>
            {capitalize(food.name)} {food.isDirty && '*'}
          </Grid>
          <Grid item xs={7}>
            <Grid
              container
              justify='space-around'
              spacing={2}
              alignItems='center'
            >
              <Grid item xs={3}>
                <Input
                  value={quantity}
                  onChange={onChangeQuantity}
                  className={classes.input}
                  disableUnderline
                  type='number'
                  onBlur={onBlurUpdate}
                ></Input>
              </Grid>
              <Value color='red'>{Math.round(food.protein)}</Value>
              <Value color='blue'>{Math.round(food.carbs)}</Value>
              <Value color='green'>{Math.round(food.fat)}</Value>
            </Grid>
          </Grid>
        </Grid>
      </ListItem>
    </SwipeableListItem>
  )
}

const mapActionsToProps = { softUpdateFood, updateFood, deleteFood }

const mapStateToProps = state => ({})

export default connect(mapStateToProps, mapActionsToProps)(FoodItem)
