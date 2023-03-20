import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import React from 'react'

const MealViewType = ({viewMode, onChangeViewMode }) => {
  return (
    <ToggleButtonGroup
      sx={{ mb: 3 }}
      fullWidth
      value={viewMode}
      variant='contained'
      exclusive
      onChange={onChangeViewMode}
    >
      <ToggleButton value='numeric'>Numeric</ToggleButton>
      <ToggleButton value='percent'>Percent</ToggleButton>
    </ToggleButtonGroup>
  )
}

export default MealViewType
