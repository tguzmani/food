import { action } from 'easy-peasy'

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
}

export default foodsActions
