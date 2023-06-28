import TodayIcon from '@mui/icons-material/Today'
import AssessmentIcon from '@mui/icons-material/Assessment'
import InfoIcon from '@mui/icons-material/Info'
import TimelineIcon from '@mui/icons-material/Timeline'
import PersonIcon from '@mui/icons-material/Person'
import PeopleIcon from '@mui/icons-material/People'
import { useStoreState } from 'config/easy-peasy.store'
import { useTranslation } from 'react-i18next'
import { NavigationItem } from './navigation.model'


const useNavigationItems = () => {
  // const { userIsPremium, userIsAdmin } = useStoreState(state => state.users)

  const { t } = useTranslation()

  let navigationItems: NavigationItem[] = [
    { to: '/', text: t('sidebar.day'), Icon: TodayIcon },
    { to: '/measurements', text: t('sidebar.measurements'), Icon: AssessmentIcon },
    { to: '/references', text: 'References', Icon: InfoIcon },
    {
      to: '/statistics',
      text: 'Statistics',
      Icon: TimelineIcon,
      isPremium: true,
    },
    { to: '/users', text: 'Users', Icon: PeopleIcon, isAdmin: true },
    { to: '/profile', text: 'Profile', Icon: PersonIcon },
  ]

  // if (!userIsPremium) navigationItems = navigationItems.filter(link => !link.isPremium)

  // if (!userIsAdmin) navigationItems = navigationItems.filter(link => !link.isAdmin)

  return navigationItems
}

export default useNavigationItems
