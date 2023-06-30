export type UserProfileOffsetMode = 'deficit' | 'surplus' | 'maintenance'
export type Units = 'kg' | 'lb'
export type Gender = 'm' | 'f'


export interface UserGoals {
  protein: number
  fat: number
  carbs: number
}

export interface UserPremiumStatus {
  isPremium: boolean
  isPremiumUntil: string
}

export interface UserSettings {
  themeMode: string
  units: string
}

export interface UserProfile {
  age: number
  height: number
  sex: string
  baseWeight: number
  activity: number
  proteinPref: number
  fatPref: number
  offset: number
  offsetMode: UserProfileOffsetMode
}

export interface User extends UserSettings, UserPremiumStatus, UserProfile {
  _id: string
  goals: UserGoals
  macroGoals: UserGoals
  role: string
  offset: number
  isSetupComplete: boolean
  name: string
  email: string
  activity: number
  gender: string
  birthdate: string
  password: string | undefined
}
