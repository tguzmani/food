import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const useTitle = () => {
  const location = useLocation().pathname
  const [title, setTitle] = useState('Food')

  const titles = {
    '/': 'Day',
    '/measurements': 'Measurements',
    '/references': 'References',
    '/profile': 'Profile',
    '/statistics': 'Statistics',
    '/users': 'Users',
    '/settings': 'Settings',
  }

  useEffect(() => {
    const title = titles[location.match(/\/[a-z]*/)[0]]
    setTitle(title)
    document.title = `Food | ${title}`
    // eslint-disable-next-line
  }, [location])

  return title
}

export default useTitle
