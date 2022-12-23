import React, { useState, useEffect } from 'react'

import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Avatar,
  Stack,
} from '@mui/material'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { withRouter } from 'react-router-dom'
import { useTheme, Box } from '@mui/material'
import useResponsive from 'hooks/useResponsive'
import useForm from 'hooks/useForm'

const LoginForm = ({ history }) => {
  const isMobile = useResponsive('md')
  const theme = useTheme()

  const { signIn, setLoading } = useStoreActions(state => state.auth)
  const { isAuthenticated, loading } = useStoreState(state => state.auth)

  const [credentials, bindCredentials, areCredentialsEmpty] = useForm({
    email: '',
    password: '',
  })

  useEffect(() => {
    setLoading(false)
  }, [])

  useEffect(() => {
    if (isAuthenticated) history.push('/')
  }, [isAuthenticated, history])

  const onClick = e => {
    e.preventDefault()
    signIn(credentials)
  }

  return (
    <Card sx={{ paddingTop: '4px', width: isMobile ? '100%' : '85%' }}>
      <CardContent sx={{ height: isMobile ? '50vh' : '40vh' }}>
        <Stack
          sx={{ height: '100%' }}
          direction='column'
          justifyContent='space-between'
        >
          <Box mt={2}>
            <Stack alignItems='center' spacing={1}>
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                Login
              </Typography>
            </Stack>
          </Box>

          <Stack>
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Email Address'
              type='email'
              autoComplete='email'
              autoFocus
              {...bindCredentials('email')}
            />
            <TextField
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Password'
              type='password'
              autoComplete='password'
              {...bindCredentials('password')}
            />
          </Stack>

          <Button
            onClick={onClick}
            color='primary'
            variant='contained'
            fullWidth
            disabled={areCredentialsEmpty || loading}
          >
            {loading ? 'Loading...' : 'Sign in'}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default withRouter(LoginForm)
