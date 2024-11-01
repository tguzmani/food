import { action } from 'easy-peasy'
import usersInitialState from './users.initial-state'
import { SetProfileFieldsDto } from '../models/users.dto.model'
import { User, UserProfile } from '../models/users.model'
import { UsersState } from './users.store.model'
import { StoreFeedback } from 'common/models'

const usersActions = {
  setUser: action((state: UsersState, user: User) => {
    state.user = user
  }),

  setUsers: action((state: UsersState, users: User[]) => {
    state.users = users
  }),

  unsetUser: action((state: UsersState) => {
    state.user = undefined
  }),

  setFeedback: action((state: UsersState, feedback: StoreFeedback) => {
    state.feedback = feedback
  }),

  unsetFeedback: action((state: UsersState) => {
    state.feedback = undefined
  }),

  unsetError: action((state: UsersState) => {
    state.feedback = undefined
  }),

  setLoading: action((state: UsersState, loading) => {
    state.loading = loading
  }),

  setProfileFields: action((state: UsersState, setProfileFieldsDto: SetProfileFieldsDto) => {
    const { name, value } = setProfileFieldsDto
    
    state.profile = {
      ...state.profile,
      [name]: value === '' ? '' : parseFloat(value),
    }
  }),

  setProfile: action((state: UsersState, profile: UserProfile) => {
    state.profile = { ...state.profile, ...profile }
  }),

  replaceUser: action((state: UsersState, user: User) => {
    state.users = state.users.map(stateUser => (stateUser._id === user._id ? user : stateUser))
  }),

  resetStore: action(_ => usersInitialState),
}

export default usersActions
