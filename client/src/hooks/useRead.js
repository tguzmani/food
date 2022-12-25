import { useEffect } from 'react'

const useRead = (...functions) => {
  useEffect(() => {
    functions.forEach(fn => fn())
  }, [functions])
}

export default useRead
