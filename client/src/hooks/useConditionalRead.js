import { useEffect } from 'react'

const useConditionalRead = (...functions) => {
  useEffect(() => {
    functions.forEach(fn => {
      if (fn.condition) fn.name()
    })
    
  }, [functions])
}

export default useConditionalRead
