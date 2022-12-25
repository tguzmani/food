import React from 'react'
import { Box, Divider, Typography, Grid } from '@mui/material'
import { useSelector } from 'react-redux'

import dayjs from 'dayjs'

import EventIcon from '@mui/icons-material/Event'
import EmailIcon from '@mui/icons-material/Email'
import PersonalInformation from './PersonalInformation'
import MacroInformation from './MacroInformation'
import BMRs from './BMRs'
import useUser from 'hooks/useUser'

const UserInformation = () => {
  const user = useUser()

  if (!user) return <div>Loading...</div>

  const Detail = ({ Icon, children }) => (
    <Box display='flex' alignItems='center' mb={1}>
      <Icon fontSize='small' style={{ marginRight: '0.25em' }} />
      <Typography variant='body'>{children}</Typography>
    </Box>
  )

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} lg={3}>
        <Box mb={3}>
          <Typography variant='h4' gutterBottom>
            {user.name}
          </Typography>
          <Detail Icon={EmailIcon}>{user.email}</Detail>
          <Detail Icon={EventIcon}>
            Since {dayjs(user.createdAt).format('MMMM 11, YYYY')}
          </Detail>
        </Box>
        <Divider />
        <Box mt={3}>
          <Typography variant='h5' gutterBottom>
            Personal Information
          </Typography>
          <PersonalInformation />
        </Box>
      </Grid>

      <Grid item xs={12} lg={6}>
        <Typography variant='h5'>Macronutrient Information</Typography>
        <MacroInformation />
      </Grid>

      <Grid item xs={12} lg={3}>
        <Typography variant='h5' gutterBottom>
          Caloric Intake
        </Typography>
        <BMRs />
      </Grid>
    </Grid>
  )
}

export default UserInformation
