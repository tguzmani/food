import TodayIcon from '@mui/icons-material/Today'
import AssessmentIcon from '@mui/icons-material/Assessment'
import InfoIcon from '@mui/icons-material/Info'
import TimelineIcon from '@mui/icons-material/Timeline'
import PersonIcon from '@mui/icons-material/Person'
import PeopleIcon from '@mui/icons-material/People'
import { useStoreState } from 'easy-peasy'

const useRoutes = () => {
  const { userIsPremium, userIsAdmin } = useStoreState(state => state.users)

  let routes = [
    { to: '/', text: 'Day', Icon: TodayIcon },
    { to: '/measurements', text: 'Measurements', Icon: AssessmentIcon },
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

  if (!userIsPremium) routes = routes.filter(link => !link.isPremium)

  if (!userIsAdmin) routes = routes.filter(link => !link.isAdmin)

  return routes
}

export default useRoutes
