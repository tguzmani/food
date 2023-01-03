const profile = {
  age: 0,
  height: '',
  sex: '',
  baseWeight: '',
  offset: 0,
  offsetMode: 'maintenance',

  activity: 1.2,
  proteinPref: 0.8,
  fatPref: 20,
}

const usersInitialState = {
  user: undefined,
  users: [], 
  isAuthenticated: false,
  loading: true,
  error: undefined,
  profile,
}

export default usersInitialState