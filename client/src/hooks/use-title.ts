import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const useTitle = () => {
  const location = useLocation().pathname
  const [title, setTitle] = useState('Food')
  const { t } = useTranslation()

  const titles: Record<string, string> = {
    '/': 'sidebar.day',
    '/measurements': 'sidebar.measurements',
    '/references': 'sidebar.references',
    '/profile': 'sidebar.profile',
    '/statistics': 'sidebar.statistics',
    '/users': 'sidebar.users',
    '/settings': 'sidebar.settings',
  };

  useEffect(() => {
    const baseUrl = location.match(/\/[a-z]*/)
    const title = titles[baseUrl ? baseUrl[0] : '']
    setTitle(title)
    document.title = `Food | ${t(title)}`
    // eslint-disable-next-line
  }, [location])

  return title
}

export default useTitle
