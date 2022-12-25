import React from 'react'
import { ListItem, Grid, Input, Box } from '@mui/material'
import makeStyles from '@mui/styles/makeStyles'
import { capitalize } from './../../util/index'
import { SwipeableListItem } from '@sandstreamdev/react-swipeable-list'
import '@sandstreamdev/react-swipeable-list/dist/styles.css'
import DeleteIcon from '@mui/icons-material/Delete'
import { useStoreActions } from 'easy-peasy'

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

const FoodItem = ({ food }) => {
  const {
    replaceFood: softUpdateFood,
    updateFood,
    deleteFood,
  } = useStoreActions(actions => actions.foods)

  const [quantity, setQuantity] = React.useState(food.quantity)
  const classes = useStyles()
  const { protein, carbs, fat } = food.reference ? food.reference : food.ref

  const onChangeQuantity = e => {
    setQuantity(parseFloat(e.target.value))
  }

  const updatedFood = {
    ...food,
    quantity: isNaN(quantity) ? 0 : quantity,
    protein: isNaN(protein * quantity) ? 0 : protein * quantity,
    carbs: isNaN(carbs * quantity) ? 0 : carbs * quantity,
    fat: isNaN(fat * quantity) ? 0 : fat * quantity,
  }

  const onBlurUpdate = e => {
    updateFood(updatedFood)

    if (isNaN(quantity)) setQuantity(0)
  }

  React.useEffect(() => {
    if (quantity !== food.quantity) softUpdateFood(updatedFood)
    // eslint-disable-next-line
  }, [quantity])

  return (
    <SwipeableListItem
      swipeLeft={{
        content: <Delete />,
        action: () => deleteFood(food),
      }}
      threshold={0.9}
    >
      <ListItem className={classes.root} divider>
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={5}>
            {capitalize(food.name)} {food.isDirty && '*'}
          </Grid>
          
          <Grid item xs={7}>
            <Grid
              container
              justifyContent='space-around'
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

export default FoodItem
