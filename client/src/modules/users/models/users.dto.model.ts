import { UserProfile } from './users.model'

export interface SetProfileFieldsDto {
  name: keyof UserProfile
  value: string
}

export interface SignUpDto {
  firstName: string
  lastName: string
  email: string
  password: string
  passwordConfirm: string
  birthdate: string
  gender: string
  units: string
}
