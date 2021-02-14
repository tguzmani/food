import React from 'react'
import { Container, Grid, Typography } from '@material-ui/core'

import Background from '../../img/bg-1.jpg'
import LoginForm from '../auth/LoginForm'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  header: {
    margin: theme.spacing(3),
    color: '#ffffff',
    display: 'flex',
    justifyContent: 'flex-start',
  },

  form: {
    display: 'flex',
    justifyContent: 'center',
  },

  footer: {
    margin: theme.spacing(3),
    color: '#ffffff',
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

const Login = () => {
  const classes = useStyles()

  return (
    <>
      <div
        style={{
          background: `url(${Background}) no-repeat center center fixed`,
        }}
        className='background'
      ></div>
      <Container>
        <Grid
          container
          spacing={0}
          justify='space-between'
          direction='column'
          style={{ minHeight: '100vh' }}
        >
          <Grid item>
            <Typography component='h1' variant='h5' className={classes.header}>
              Food
            </Typography>
          </Grid>
          <Grid item className={classes.form}>
            <LoginForm />
          </Grid>
          <Grid item className={classes.footer}>
            <Typography>&copy; by Tomás Guzmán</Typography>
          </Grid>
        </Grid>
      </Container>
    </>
  )
}

export default Login
