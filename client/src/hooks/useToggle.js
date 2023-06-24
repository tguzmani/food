import { useState } from 'react'

const useToggle = () => {
  const [value, setValue] = useState(false)

  const toggleValue = () => {
    setValue(!value)
  }

  return { value, setValue, toggleValue }
}

export default useToggle
