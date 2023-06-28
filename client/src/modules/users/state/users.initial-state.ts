import { UserProfile } from "./models/users.model"
import { UsersInitialState } from "./users.store.model"

const profile: UserProfile = {
  age: 0,
  height: 0,
  sex: '',
  baseWeight: 0,
  offset: 0,
  offsetMode: 'maintenance',

  activity: 1.2,
  proteinPref: 0.8,
  fatPref: 20,
}

const usersInitialState: UsersInitialState = {
  user: undefined,
  users: [], 
  isAuthenticated: false,
  loading: false,
  error: undefined,
  profile,
}

export default usersInitialState