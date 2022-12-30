import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import React from 'react'
import WhatshotIcon from '@mui/icons-material/Whatshot'

const OffsetMode = ({ offsetMode, onChangeOffsetMode }) => {
  return (
    <ToggleButtonGroup
      sx={{ mt: 1 }}
      fullWidth
      value={offsetMode}
      variant='contained'
      exclusive
      onChange={onChangeOffsetMode}
    >
      <ToggleButton value='deficit'>Deficit</ToggleButton>
      <ToggleButton value='maintenance'>Maintenance</ToggleButton>
      <ToggleButton value='surplus'>Surplus</ToggleButton>
    </ToggleButtonGroup>
  )
}

export default OffsetMode
