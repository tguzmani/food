import { CommonStoreActions, CommonStoreModel } from 'common/models'
import { Action, ActionOn, Computed, FilterActionTypes, StateMapper, Thunk } from 'easy-peasy'
import { User, UserProfile } from '../models/users.model'
import { UserCredentials } from '../models/users.auth.model'
import { SetProfileFieldsDto } from '../models/users.dto.model'
import StoreModel from 'config/easy-peasy.store.model'

export type UsersState = StateMapper<FilterActionTypes<UsersStoreModel>>

export interface UsersInitialState extends CommonStoreModel {
  user?: User
  users: User[]
  isAuthenticated: boolean
  profile: UserProfile
}

interface UsersActions extends CommonStoreActions<UsersStoreModel> {
  setIsAuthenticated: Action<UsersStoreModel, boolean>
  setProfileFields: Action<UsersStoreModel, SetProfileFieldsDto>
  setProfile: Action<UsersStoreModel, UserProfile>
  replaceUser: Action<UsersStoreModel, User>
}

interface UsersAuthActions {
  setUser: Action<UsersStoreModel, User>
  setUsers: Action<UsersStoreModel, User[]>
  unsetUser: Action<UsersStoreModel>
}

interface UsersThunks {
  signIn: Thunk<UsersStoreModel, UserCredentials>
  signOut: Thunk<UsersStoreModel>
  signUp: Thunk<UsersStoreModel, UserCredentials>
  readUser: Thunk<UsersStoreModel>
  readUsers: Thunk<UsersStoreModel>
  updateUser: Thunk<UsersStoreModel, User>
  updateUserByAdmin: Thunk<UsersStoreModel, User>
}

interface UsersComputeds { 
  userIsPremium: Computed<UsersStoreModel, boolean>
  userIsAdmin: Computed<UsersStoreModel, boolean>
  userAge: Computed<UsersStoreModel, number>
  profileBaseWeight: Computed<UsersStoreModel, number>
  baseBMR: Computed<UsersStoreModel, number>
  activityBMR: Computed<UsersStoreModel, number>
  offsetBMR: Computed<UsersStoreModel, number>
  proteinCalories: Computed<UsersStoreModel, number>
  fatCalories: Computed<UsersStoreModel, number>
  carbsCalories: Computed<UsersStoreModel, number>
  proteinGrams: Computed<UsersStoreModel, number>
  fatGrams: Computed<UsersStoreModel, number>
  carbsGrams: Computed<UsersStoreModel, number>
}

type UsersStoreModel = UsersInitialState & UsersActions & UsersAuthActions & UsersThunks & UsersComputeds;

export default UsersStoreModel
