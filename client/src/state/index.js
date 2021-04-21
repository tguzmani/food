import { combineReducers } from 'redux'

import authReducer from './auth/authReducer'
import foodReducer from './food/foodReducer'
import referenceReducer from './reference/referenceReducer'
import measureReducer from './measure/measureReducer'
import recipeReducer from './recipe/recipeReducer'
import profileReducer from './profile/profileReducer'

export default combineReducers({
  auth: authReducer,
  food: foodReducer,
  reference: referenceReducer,
  measure: measureReducer,
  recipe: recipeReducer,
  profile: profileReducer,
})
