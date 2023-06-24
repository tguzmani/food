import dayjs from 'dayjs'
import { computed } from 'easy-peasy'

const usersComputeds = {
  userIsPremium: computed(state => dayjs().isBefore(state.user?.isPremiumUntil)),

  userIsAdmin: computed(state => state.user?.role === 'admin'),

  userAge: computed(state =>
    dayjs().diff(state.user?.birthdate, 'year')
  ),

  profileBaseWeight: computed(state =>
    state.user?.units === 'kg'
      ? state.profile.baseWeight
      : state.profile.baseWeight / 2.2
  ),

  baseBMR: computed(state => {
    if (state.profile.height === '' || state.profileBaseWeight === '') return 0

    return state.user?.sex === 'f'
      ? 655.1 +
          9.563 * state.profileBaseWeight +
          1.85 * state.profile.height -
          4.676 * state.userAge
      : 66.5 +
          13.75 * state.profileBaseWeight +
          5.003 * state.profile.height -
          6.755 * state.userAge
  }),

  activiyBMR: computed(state =>
    state.baseBMR === 0 ? 0 : state.baseBMR * state.profile.activity
  ),

  offsetBMR: computed(state => {
    const offsetMultiplier =
      state.profile.offsetMode === 'deficit'
        ? -1
        : state.profile.offsetMode === 'maintenance'
        ? 0
        : 1

    const offset = parseFloat(state.profile.offset) * offsetMultiplier

    return state.baseBMR === 0 ? 0 : state.activiyBMR + offset
  }),

  proteinCalories: computed(state =>
    state.profileBaseWeight * 2.2 * state.profile.proteinPref * 4
  ),

  fatCalories: computed(state =>
    (state.offsetBMR * state.profile.fatPref) / 100
  ),

  carbsCalories: computed(state =>
    state.offsetBMR - state.proteinCalories - state.fatCalories
  ),

  proteinGrams: computed(state => state.proteinCalories / 4),

  fatGrams: computed(state => state.fatCalories / 9),

  carbsGrams: computed(state => state.carbsCalories / 4),
  
}

export default usersComputeds
