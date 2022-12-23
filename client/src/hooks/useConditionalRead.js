import { useEffect } from 'react'

const useConditionalRead = (...functions) => {
  useEffect(() => {
    functions.forEach(fn => {
      if (fn.condition) fn.name()
    })
  }, [])
}

export default useConditionalRead
