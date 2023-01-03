import React from 'react'

import { Unstable_MobileNextDatePicker as MobileNextDatePicker } from '@mui/x-date-pickers/MobileNextDatePicker'
import { Unstable_DesktopNextDatePicker as DesktopNextDatePicker } from '@mui/x-date-pickers'

import useResponsive from 'hooks/useResponsive'

const DatePicker = ({ ...rest }) => {
  const isMobile = useResponsive('sm')

  const DatePicker = isMobile ? MobileNextDatePicker : DesktopNextDatePicker

  return <DatePicker {...rest} />
}

export default DatePicker
