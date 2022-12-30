import React, { useEffect } from 'react'

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
import useAuth from 'hooks/useAuth'
import Alert from 'components/layout/Alert'
import useRead from 'hooks/useRead'

const LoginForm = ({ history }) => {
  const isMobile = useResponsive('sm')
  const theme = useTheme()
  const isAuth = useAuth()

  const { signIn, setLoading } = useStoreActions(actions => actions.users)
  const { error } = useStoreState(state => state.users)
  const { loading } = useStoreState(state => state.users)

  const [credentials, bindCredentials, areCredentialsEmpty] = useForm({
    email: '',
    password: '',
  })
  
  useEffect(() => {
    setLoading(false)
  }, [isAuth, history])

  useEffect(() => {
    if (isAuth) history.push('/')
  }, [isAuth, history])

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
          {error && <Alert>{error}</Alert>}
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
