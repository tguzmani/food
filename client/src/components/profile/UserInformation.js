import React from 'react'
import {
  Box,
  Divider,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material'

import dayjs from 'dayjs'

import EventIcon from '@mui/icons-material/Event'
import EmailIcon from '@mui/icons-material/Email'
import PersonalInformation from './PersonalInformation'
import MacroInformation from './MacroInformation'
import BMRs from './BMRs'
import useUser from 'hooks/useUser'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import PersonIcon from '@mui/icons-material/Person'
import { useStoreState } from 'easy-peasy'
import CaloriesToolbar from './CaloriesToolbar'
import useResponsive from 'hooks/useResponsive'

const UserInformation = () => {
  const { userIsPremium, user } = useStoreState(state => state.users)
  const isMobile = useResponsive('md')

  if (!user) return <div>Loading...</div>

  const Detail = ({ Icon, children }) => (
    <Box display='flex' alignItems='center' mb={1}>
      <Icon fontSize='small' sx={{ marginRight: '0.25em' }} />
      <Typography variant='body'>{children}</Typography>
    </Box>
  )

  const MembershipIcon = userIsPremium ? WorkspacePremiumIcon : PersonIcon

  return (
    <>
      <Grid container spacing={4}>
        {/* User Details */}
        <Grid item xs={12} lg={3}>
          <Box mb={3}>
            <Typography variant='h4' gutterBottom>
              {user.firstName} {user.lastName}
            </Typography>
            <Detail Icon={EmailIcon}>{user.email}</Detail>
            <Detail Icon={EventIcon}>
              Since {dayjs(user.createdAt).format('MMMM DD, YYYY')}
            </Detail>
            <Detail Icon={MembershipIcon}>
              {userIsPremium ? 'Premium' : 'Free'} Membership
            </Detail>
          </Box>

          {/* Caloric Intake */}
          <Card mt={2}>
            <CardContent>
              <BMRs />
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Box mt={isMobile ? 3 : 3}>
            <Typography variant='h6' gutterBottom>
              Personal Information
            </Typography>
            <PersonalInformation />
          </Box>
        </Grid>

        {/* Macronutrient Information */}
        <Grid item xs={12} lg={6}>
          <Typography variant='h6'>Macronutrient Information</Typography>
          <MacroInformation />
        </Grid>
      </Grid>
    </>
  )
}

export default UserInformation
