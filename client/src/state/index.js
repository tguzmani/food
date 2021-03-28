import { combineReducers } from 'redux'

import authReducer from './auth/authReducer'
import foodReducer from './food/foodReducer'

export default combineReducers({
  auth: authReducer,
  food: foodReducer,
})
