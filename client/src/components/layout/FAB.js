import React from 'react'
import { Fab, Tooltip, Zoom, styled } from '@mui/material'
import useResponsive from 'hooks/useResponsive'

const FabContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  left: theme.spacing(-3),
  display: 'flex',
  justifyContent: 'flex-end',
  width: '100%',
  zIndex: 2,
}))

const FAB = ({ Icon, onClick, show, disabled, tooltipTitle }) => {
  const isMobile = useResponsive('md')

  return (
    <FabContainer sx={{ bottom: isMobile ? '64px' : '56px' }}>
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
