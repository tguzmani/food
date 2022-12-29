import { useEffect } from 'react'

const useRead = (...functions) => {
  useEffect(() => {
    functions.forEach(fn => fn())
    // eslint-disable-next-line
  }, [])
}

export default useRead
