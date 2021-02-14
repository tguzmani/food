import { useState, useEffect } from 'react'

const useConfirmation = (timeout = 1000) => {
  const [confirm, setConfirm] = useState(false)

  useEffect(() => {
    if (confirm)
      setTimeout(() => {
        setConfirm(false)
      }, timeout)
  }, [confirm, timeout])

  const handleConfirm = () => {
    setConfirm(true)
  }

  return [confirm, handleConfirm]
}

export default useConfirmation
