import { action } from 'easy-peasy'
import foodsInitalState from './foods.initialState'

const foodsActions = {
  appendFood: action((state, food) => {
    state.foods.push(food)
  }),

  setFoods: action((state, foods) => {
    state.foods = foods
  }),

  clearFoods: action(state => {
    state.foods = []
  }),

  filterFoods: action((state, food) => {
    state.foods = state.foods.filter(stateFood => stateFood._id !== food._id)
  }),

  replaceFood: action((state, food) => {
    state.foods = state.foods.map(stateFood =>
      stateFood._id === food._id ? food : stateFood
    )
  }),

  setLoading: action((state, loading) => {
    state.loading = loading
  }),

  toggleCanDragFoods: action((state, value) => {
    state.canDragFoods = !state.canDragFoods
  }),

  resetStore: action(state => foodsInitalState),
}

export default foodsActions
