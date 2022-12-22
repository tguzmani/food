import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { signin } from '../../state/auth/authActions'
import { withRouter } from 'react-router-dom'

import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid,
  Avatar,
} from '@mui/material'

import makeStyles from '@mui/styles/makeStyles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

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

const LoginForm = ({ signin, isAuthenticated, history, loading }) => {
  const classes = useStyles()

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
    signin(credentials)
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
            disabled={areAnyFieldsEmpty}
            className={classes.submit}
          >
            Sign in
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

const mapActionsToProps = { signin }

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
})

export default withRouter(
  connect(mapStateToProps, mapActionsToProps)(LoginForm)
)
