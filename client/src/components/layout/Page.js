import { Fade } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'

const Page = ({ pathname, children }) => {
  const location = useLocation()

  return <Fade in={location.pathname === pathname}>{children}</Fade>
}

export default Page
