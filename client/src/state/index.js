import { combineReducers } from 'redux'

import authReducer from './auth/authReducer'
import foodReducer from './food/foodReducer'
import referenceReducer from './reference/referenceReducer'
import measureReducer from './measure/measureReducer'

export default combineReducers({
  auth: authReducer,
  food: foodReducer,
  reference: referenceReducer,
  measure: measureReducer,
})
