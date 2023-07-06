import React from 'react'
import { ListItem, Grid, Input, Box } from '@mui/material'
import { capitalize } from './../../util/index'
import { SwipeableListItem } from '@sandstreamdev/react-swipeable-list'
import '@sandstreamdev/react-swipeable-list/dist/styles.css'
import DeleteIcon from '@mui/icons-material/Delete'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useDrag } from 'react-dnd'
import useIsDarkMode from 'hooks/useIsDarkMode'
import DirtyIndicator from './DirtyIndicator'

const Value = ({ children, color }) => {
  const { userIsPremium } = useStoreState(state => state.users)

  return (
    <Grid
      item
      xs={3}
      sx={{
        textAlign: 'right',
        color,
        visibility: userIsPremium ? 'visible' : 'hidden',
        opacity: Math.round(children) === 0 ? 0.3 : 1,
      }}
    >
      {children && Math.round(children)}
    </Grid>
  )
}

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
  const isDarkMode = useIsDarkMode()

  const {
    replaceFood: softUpdateFood,
    updateFood,
    deleteFood,
  } = useStoreActions(actions => actions.foods)


  const { canDragFoods } = useStoreState(state => state.foods)

  const [quantity, setQuantity] = React.useState(food.quantity)

  // eslint-disable-next-line
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: 'food',
      item: food,
      canDrag: monitor => canDragFoods,
      collect: monitor => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [canDragFoods]
  )

  const onChangeQuantity = e => {
    setQuantity(parseFloat(e.target.value))
  }

  const updatedFood = {
    ...food,
    quantity: isNaN(quantity) ? 0 : quantity,
    protein: isNaN(food.reference.protein * quantity) ? 0 : food.reference.protein * quantity,
    carbs: isNaN(food.reference.carbs * quantity) ? 0 : food.reference.carbs * quantity,
    fat: isNaN(food.reference.fat * quantity) ? 0 : food.reference.fat * quantity,
  }

  const onBlurUpdate = e => {
    updateFood(updatedFood)

    if (isNaN(quantity)) setQuantity(0)
  }

  React.useEffect(() => {
    if (quantity !== food?.quantity) softUpdateFood(updatedFood)
    // eslint-disable-next-line
  }, [quantity])

  return (
    <SwipeableListItem
      blockSwipe={canDragFoods}
      swipeLeft={{
        content: <Delete />,
        action: () => deleteFood(food),
      }}
      threshold={0.9}
    >
      <ListItem
        divider
        ref={drag}
        sx={{
          backgroundColor: isDarkMode ? 'grey.950' : 'inherit',
          borderBottomColor: isDarkMode ? 'grey.800' : 'grey.300',
          fontSize: '14px',
        }}
      >
        <Grid container spacing={2} alignItems='center'>
          <Grid item xs={5}>
            {capitalize(food?.name)} {food?.isDirty && <DirtyIndicator />}
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
                  value={quantity ? quantity : quantity.toString()}
                  onChange={onChangeQuantity}
                  disableUnderline
                  type='number'
                  onBlur={onBlurUpdate}
                  inputProps={{
                    style: {
                      fontSize: '14px',
                    },
                  }}
                ></Input>
              </Grid>

              <Value color='error.main'>{food?.protein}</Value>
              <Value color='primary.main'>{food?.carbs}</Value>
              <Value color='success.main'>{food?.fat}</Value>
            </Grid>
          </Grid>
        </Grid>
      </ListItem>
    </SwipeableListItem>
  )
}

export default FoodItem
