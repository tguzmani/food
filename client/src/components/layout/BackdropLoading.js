import React from 'react'
import { Backdrop, CircularProgress } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';


//   backdrop: {
//     zIndex: theme.zIndex.drawer + 1,
//     color: '#fff',
//   },

const BackdropLoading = ({ open }) => {

  return (
    <Backdrop open={open} sx={{color: 'white'}}>
      <CircularProgress color='inherit' />
    </Backdrop>
  )
}

export default BackdropLoading
