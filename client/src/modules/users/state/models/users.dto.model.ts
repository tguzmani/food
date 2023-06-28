import { UserProfile } from "./users.model"

export interface SetProfileFieldsDto {
  name: keyof UserProfile
  value: string 
}