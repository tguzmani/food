import React from 'react'
import { Box, Typography, Grid } from '@mui/material'

import dayjs from 'dayjs'

import EventIcon from '@mui/icons-material/Event'
import EmailIcon from '@mui/icons-material/Email'
import PersonalInformation from './PersonalInformation'
import MacroInformation from './MacroInformation'
import BMRs from './BMRs'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import PersonIcon from '@mui/icons-material/Person'
import { useStoreState } from 'easy-peasy'
import useResponsive from 'hooks/useResponsive'
import { useTranslation } from 'react-i18next'

const UserInformation = () => {
  const { userIsPremium, user } = useStoreState(state => state.users)
  const isMobile = useResponsive('md')

  const { t } = useTranslation()

  if (!user) return <div>Loading...</div>

  const Detail = ({ Icon, children }) => (
    <Box display="flex" alignItems="center" mb={1}>
      <Icon fontSize="small" sx={{ marginRight: '0.25em' }} />
      <Typography variant="body">{children}</Typography>
    </Box>
  )

  const MembershipIcon = userIsPremium ? WorkspacePremiumIcon : PersonIcon

  return (
    <>
      <Grid container spacing={4}>
        {/* User Details */}
        <Grid item xs={12} lg={3}>
          <Box mb={3}>
            <Typography variant="h4" gutterBottom>
              {user.firstName} {user.lastName}
            </Typography>
            <Detail Icon={EmailIcon}>{user.email}</Detail>
            <Detail Icon={EventIcon}>
              {t('profile.since')} {dayjs(user.createdAt).format('MMMM DD, YYYY')}
            </Detail>
            <Detail Icon={MembershipIcon}>
              {t('users.membership')} {userIsPremium ? 'Premium' : 'Free'}
            </Detail>
          </Box>

          {/* Caloric Intake */}
          <BMRs />

          {/* Personal Information */}
          <Box mt={isMobile ? 3 : 3}>
            <Typography variant="h6" gutterBottom>
              {t('profile.personalInformation')}
            </Typography>
            <PersonalInformation />
          </Box>
        </Grid>

        {/* Macronutrient Information */}
        <Grid item xs={12} lg={6}>
          <Typography variant="h6">{t('profile.macronutrientInformation')}</Typography>
          <MacroInformation />
        </Grid>
      </Grid>
    </>
  )
}

export default UserInformation
