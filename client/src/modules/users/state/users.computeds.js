import { computed } from 'easy-peasy'

const usersComputeds = {
  profileBaseWeight: computed(state =>
    state.user?.units === 'kg'
      ? state.profile.baseWeight
      : state.profile.baseWeight / 2.2
  ),

  baseBMR: computed(state =>
    state.user?.sex === 'f'
      ? 655.1 +
        9.563 * state.profileBaseWeight +
        1.85 * state.profile.height -
        4.676 * state.profile.age
      : 66.5 +
        13.75 * state.profileBaseWeight +
        5.003 * state.profile.height -
        6.755 * state.profile.age
  ),

  activiyBMR: computed(state => state.baseBMR * state.profile.activity),

  offsetBMR: computed(state => state.activiyBMR + state.profile.offset),
}

export default usersComputeds
