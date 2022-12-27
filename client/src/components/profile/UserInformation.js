import React from 'react'
import { Box, Divider, Typography, Grid } from '@mui/material'

import dayjs from 'dayjs'

import EventIcon from '@mui/icons-material/Event'
import EmailIcon from '@mui/icons-material/Email'
import PersonalInformation from './PersonalInformation'
import MacroInformation from './MacroInformation'
import BMRs from './BMRs'
import useUser from 'hooks/useUser'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PersonIcon from '@mui/icons-material/Person';

const UserInformation = () => {
  const user = useUser()

  if (!user) return <div>Loading...</div>

  const Detail = ({ Icon, children }) => (
    <Box display='flex' alignItems='center' mb={1}>
      <Icon fontSize='small' sx={{ marginRight: '0.25em' }} />
      <Typography variant='body'>{children}</Typography>
    </Box>
  )

  const MembershipIcon = user.isPremium ? WorkspacePremiumIcon : PersonIcon

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} lg={3}>
        <Box mb={3}>
          <Typography variant='h4' gutterBottom>
            {user.name}
          </Typography>
          <Detail Icon={EmailIcon}>{user.email}</Detail>
          <Detail Icon={EventIcon}>
            Since {dayjs(user.createdAt).format('MMMM DD, YYYY')}
          </Detail>
          <Detail Icon={MembershipIcon}>
            {user.isPremium ? 'Premium' : 'Free'} Membership
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
