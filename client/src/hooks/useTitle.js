import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

const useTitle = () => {
  const location = useLocation().pathname
  const [title, setTitle] = useState('Food')
  const { t } = useTranslation()

  const titles = {
    '/': t('sidebar.day'),
    '/measurements': t('sidebar.measurements'),
    '/references': t('sidebar.references'),
    '/profile': t('sidebar.profile'),
    '/statistics': t('sidebar.statistics'),
    '/users': t('sidebar.users'),
    '/settings': t('sidebar.settings'),
  };

  useEffect(() => {
    const title = titles[location.match(/\/[a-z]*/)[0]]
    setTitle(title)
    document.title = `Food | ${title}`
    // eslint-disable-next-line
  }, [location])

  return title
}

export default useTitle
