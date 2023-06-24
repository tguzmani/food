import React from 'react'
import './App.css'
import '@sandstreamdev/react-swipeable-list/dist/styles.css'

import { StoreProvider } from 'easy-peasy'
import store from './config/easy-peasy.store'

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import Theme from 'Theme'
import Router from 'Router'

import './i18n/config';

const App = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StoreProvider store={store}>
        <Theme>
          <Router />
        </Theme>
      </StoreProvider>
    </LocalizationProvider>
  )
}

export default App
