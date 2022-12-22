import React, { useState, useEffect } from 'react'

import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Avatar,
} from '@mui/material'

import makeStyles from '@mui/styles/makeStyles'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {
  useStoreActions,
  useStoreState,
} from 'easy-peasy'
import { withRouter } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },

  card: {
    margin: theme.spacing(0, 2),
  },
}))

const LoginForm = ({ history }) => {
  const classes = useStyles()

  const { signIn } = useStoreActions(state => state.auth)
  const { isAuthenticated, loading } = useStoreState(state => state.auth)

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    if (isAuthenticated) history.push('/')
  }, [isAuthenticated, history])

  const onChange = e =>
    setCredentials({ ...credentials, [e.target.name]: e.target.value })

  const onClick = e => {
    e.preventDefault()
    signIn(credentials)
  }

  const { email, password } = credentials

  const areAnyFieldsEmpty = email === '' || password === ''

  return (
    <Card className={classes.card}>
      <CardContent>
        <Grid align='center'>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Login
          </Typography>
        </Grid>
        <form>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Email Address'
            name='email'
            type='email'
            value={email}
            onChange={onChange}
            autoComplete='email'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Password'
            name='password'
            onChange={onChange}
            value={password}
            type='password'
            autoComplete='password'
          />

          <Button
            type='submit'
            onClick={onClick}
            color='primary'
            variant='contained'
            fullWidth
            pending={loading}
            disabled={areAnyFieldsEmpty || loading}
            className={classes.submit}
          >
            {loading ? "Loading..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default withRouter(LoginForm)
