import { MongoModel } from 'common/models'

export type UserProfileOffsetMode = 'deficit' | 'surplus' | 'maintenance'

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

export interface User extends MongoModel, UserSettings, UserPremiumStatus, UserProfile {
  goals: UserGoals
  role: string
  offset: number
  isSetupComplete: boolean
  name: string
  email: string
  activity: number
  gender: string
  birthdate: string
}
