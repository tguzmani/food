import { SET_FIELDS, SET_SLIDERS, SET_STATE } from './profileTypes'

const initialState = {
  age: 0,
  height: 0,
  sex: '',
  baseWeight: 0,
  offset: 0,

  activity: 0,
  proteinPref: 0.8,
  fatPref: 20,
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FIELDS:
      return {
        ...state,
        [action.payload.name]: parseFloat(action.payload.value),
      }

    case SET_SLIDERS:
      return { ...state }

    case SET_STATE:
      return {
        ...state,
        ...action.payload,
      }

    default:
      return state
  }
}

export default profileReducer
