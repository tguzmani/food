import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'

import bg1 from 'img/bg-0.jpg'
import bg2 from 'img/bg-1.jpg'
import bg3 from 'img/bg-2.jpg'
import bg4 from 'img/bg-3.jpg'

import RegisterForm from '../auth/register-form'
import useResponsive from 'hooks/useResponsive'

const backgrounds = [bg1, bg2, bg3, bg4]
const random = Math.floor(Math.random() * backgrounds.length)

const background = backgrounds[random]

const Register = () => {
  document.title = 'Food | Login'

  const isMobile = useResponsive('sm')

  return (
    <>
      <Box
        sx={{
          background: `url(${background}) no-repeat center center fixed`,
          backgroundSize: 'cover',
        }}
        className='background'
      ></Box>
      <Container>
        <Grid
          container
          spacing={0}
          justifyContent='space-between'
          sx={{ height: '100vh', padding: isMobile ? 0 : '32px 0' }}
        >
          {!isMobile && (
            <Grid item xs={12} lg={4}>
              <Typography variant='h4' sx={{ color: 'white' }}>
                Food
              </Typography>
            </Grid>
          )}
          <Grid
            item
            xs={12}
            lg={4}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RegisterForm />
          </Grid>
          {!isMobile && (
            <Grid
              item
              xs={12}
              lg={4}
              sx={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
            >
              <Typography variant='caption' sx={{ color: 'white' }}>
                &copy; 2023. By Tomás Guzmán
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  )
}

export default Register
