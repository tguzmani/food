import { computed } from 'easy-peasy'

const usersComputeds = {
  mealsUsers: computed(state => state.users.filter(user => user.meal !== 0)),
  
  previewMealUsers: computed(state => state.users.filter(user => user.meal === 0)),
}

export default usersComputeds
