import dayjs from 'dayjs'
import { computed } from 'easy-peasy'
import { UsersState } from './users.store.model'

const usersComputeds = {
  userIsPremium: computed((state: UsersState) => dayjs().isBefore(state.user?.isPremiumUntil)),

  userIsAdmin: computed((state: UsersState) => state.user?.role === 'admin'),

  userAge: computed((state: UsersState) => dayjs().diff(state.user?.birthdate, 'year')),

  profileBaseWeight: computed((state: UsersState) =>
    state.user?.units === 'kg' ? state.profile?.baseWeight : state.profile?.baseWeight / 2.2
  ),

  baseBMR: computed((state: UsersState) => {
    return state.user?.sex === 'f'
      ? 655.1 + 9.563 * state.profileBaseWeight + 1.85 * state.profile.height - 4.676 * state.userAge
      : 66.5 + 13.75 * state.profileBaseWeight + 5.003 * state.profile.height - 6.755 * state.userAge
  }),

  activityBMR: computed((state: UsersState) => (state.baseBMR === 0 ? 0 : state.baseBMR * state.profile.activity)),

  offsetBMR: computed((state: UsersState) => {
    const offsetMultiplier =
      state.profile.offsetMode === 'deficit' ? -1 : state.profile.offsetMode === 'maintenance' ? 0 : 1

    const offset = state.profile.offset * offsetMultiplier

    return state.baseBMR === 0 ? 0 : state.activityBMR + offset
  }),

  proteinCalories: computed((state: UsersState) => state.profileBaseWeight * 2.2 * state.profile.proteinPref * 4),

  fatCalories: computed((state: UsersState) => (state.offsetBMR * state.profile.fatPref) / 100),

  carbsCalories: computed((state: UsersState) => state.offsetBMR - state.proteinCalories - state.fatCalories),

  proteinGrams: computed((state: UsersState) => state.proteinCalories / 4),

  fatGrams: computed((state: UsersState) => state.fatCalories / 9),

  carbsGrams: computed((state: UsersState) => state.carbsCalories / 4),
}

export default usersComputeds
