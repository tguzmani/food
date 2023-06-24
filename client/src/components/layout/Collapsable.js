import React from 'react'
import { Collapse, IconButton, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const Collapsable = ({ text, toggler, open, children }) => {
  return (
    <>
      <Stack
        direction='row'
        alignItems='center'
        spacing={0.5}
        onClick={toggler}
        sx={{ cursor: 'pointer' }}
      >
        <IconButton
          size='small'
          sx={{
            rotate: open ? '45deg' : '0deg',
            transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;',
          }}
        >
          <AddIcon
            sx={{
              fontSize: '18px',
              color: open ? 'error.main' : 'inherit',
              transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;',
            }}
          />
        </IconButton>

        <Typography variant='body1'>{text}</Typography>
      </Stack>

      <Collapse in={open} timeout='auto' unmountOnExit>
        {children}
      </Collapse>
    </>
  )
}

export default Collapsable
