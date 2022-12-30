import React from 'react'
import { Fab, Tooltip, Zoom, styled } from '@mui/material'

const FabContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(5),
  left: theme.spacing(-3),
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  zIndex: 2,
}))

const FAB = ({ Icon, onClick, show, disabled, tooltipTitle }) => {
  return (
    <FabContainer>
      <Zoom in={show}>
        <Tooltip placement='left' title={tooltipTitle} arrow>
          <span>
            <Fab color='primary' onClick={onClick} disabled={disabled}>
              <Icon />
            </Fab>
          </span>
        </Tooltip>
      </Zoom>
    </FabContainer>
  )
}

export default FAB
