import { action } from 'easy-peasy'

const foodActions = {
  appendFood: action((state, food) => {
    state.foods.push(food)
  }),

  setFoods: action((state, foods) => {
    state.foods = foods
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

export default foodActions
