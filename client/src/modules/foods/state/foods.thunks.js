import { thunk } from 'easy-peasy'
import FoodsRepository from './foods.repository'

const foodsRepository = new FoodsRepository()

const foodThunks = {
  createFood: thunk(async (actions, food, { fail }) => {
    try {
      const createdFood = await foodsRepository.createFood(food)
      actions.appendFood(createdFood)
    } catch (error) {
      fail(error)
    }
  }),

  readFoods: thunk(async (actions, _, { fail }) => {
    try {
      const foods = await foodsRepository.readFoods()
      actions.setFoods(foods)
    } catch (error) {
      fail(error)
    }
  }),

  updateFood: thunk(async (actions, food, { fail }) => {
    try {
      const updatedFood = await foodsRepository.updateFood(food)
      actions.replaceFood(updatedFood)
    } catch (error) {
      fail(error)
    }
  }),

  deleteFood: thunk(async (actions, food, { fail }) => {
    try {
      const removedFood = await foodsRepository.filterFoods(food)
      actions.appendFood(removedFood)
    } catch (error) {
      fail(error)
    }
  }),
}

export const foodsThunksNames = Object.keys(foodThunks).map(key => key)

export default foodThunks

