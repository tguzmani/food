import { useState } from 'react'

const useAuth = () => {
  const [value, setValue] = useState(false)

  const toggleValue = () => {
    setValue(!value)
  }

  return { value, setValue, toggleValue }
}

export default useAuth
