import { SvgIconComponent } from '@mui/icons-material'

export interface NavigationItem {
  to: string
  text: string
  Icon: SvgIconComponent
  isPremium?: boolean
  isAdmin?: boolean
}
