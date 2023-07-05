import React, { useEffect } from 'react'

import { Card, CardContent, TextField, Button, Typography, Avatar, Stack } from '@mui/material'

import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { Link, useNavigate } from 'react-router-dom'
import { useTheme, Box } from '@mui/material'
import useResponsive from 'hooks/useResponsive'
import useForm from 'hooks/useForm'
import useAuth from 'hooks/useAuth'
import Alert from 'components/layout/Alert'
import { useTranslation } from 'react-i18next'

const LoginForm = ({ history }) => {
  const isMobile = useResponsive('sm')
  const theme = useTheme()
  const isAuth = useAuth()
  const navigate = useNavigate()

  const { t } = useTranslation()

  const { signIn, setLoading } = useStoreActions(actions => actions.users)
  const { error } = useStoreState(state => state.users)
  const { loading } = useStoreState(state => state.users)

  const [credentials, bindCredentials, areCredentialsEmpty] = useForm({
    email: '',
    password: '',
  })

  useEffect(() => {
    setLoading(false)
  }, [isAuth, setLoading])

  useEffect(() => {
    if (isAuth) navigate('/')
  }, [isAuth, navigate])

  const handleSignIn = e => {
    e.preventDefault()
    signIn(credentials)
  }

  return (
    <Card sx={{ paddingTop: 0.5, width: isMobile ? '100%' : '85%' }}>
      <CardContent sx={{ height: isMobile ? '50vh' : '45vh' }}>
        <Stack sx={{ height: '100%' }} direction="column" justifyContent="space-between">
          {error && <Alert>{error}</Alert>}
          <Box mt={2}>
            <Stack alignItems="center" spacing={1}>
              <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {t('login.login')}
              </Typography>
            </Stack>
          </Box>

          <Stack>
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              label={t('register.emailAddress')}
              type="email"
              autoComplete="email"
              autoFocus
              {...bindCredentials('email')}
            />
            <TextField
              variant="outlined"
              margin="dense"
              required
              fullWidth
              label={t('register.password')}
              type="password"
              autoComplete="password"
              {...bindCredentials('password')}
            />
          </Stack>

          <Button
            onClick={handleSignIn}
            color="primary"
            variant="contained"
            fullWidth
            disabled={areCredentialsEmpty || loading}
          >
            {loading ? 'Loading...' : t('register.signIn')}
          </Button>

          <Typography variant="caption" align="center">
            {t('register.dontHaveAccount')} <Link to="/register">{t('register.register')}</Link>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default LoginForm
