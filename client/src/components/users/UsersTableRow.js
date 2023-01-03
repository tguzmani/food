import { Stack, TableCell, TableRow, Typography } from '@mui/material'
import dayjs from 'dayjs'
import React from 'react'

import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import PersonIcon from '@mui/icons-material/Person'
import DatePicker from 'components/layout/DatePicker'
import useResponsive from 'hooks/useResponsive'
import { useStoreActions } from 'easy-peasy'

const UsersTableRow = ({ user }) => {
  const { updateUserByAdmin } = useStoreActions(actions => actions.users)

  const userIsPremium = dayjs().isBefore(user?.isPremiumUntil)
  const isPremiumUntil = dayjs(user.isPremiumUntil).format('YYYY-MM-DD')
  const daysRemaining = dayjs(user.isPremiumUntil).diff(dayjs(), 'days')

  const MembershipIcon = userIsPremium ? WorkspacePremiumIcon : PersonIcon
  const membershipType = userIsPremium ? 'Premium' : 'Free'

  const [premiumUntil, setPremiumUntil] = React.useState(dayjs(isPremiumUntil))

  const isMobile = useResponsive('sm')

  const handleToDateChange = date => {
    setPremiumUntil(date)
    updateUserByAdmin({ ...user, isPremiumUntil: date })
  }

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component='th' scope='user'>
        <Stack direction='row' alignItems='center' spacing={2}>
          {isMobile && <MembershipIcon />}

          <Typography variant='body2'>
            {user.firstName} {user.lastName}
          </Typography>
        </Stack>
      </TableCell>
      {!isMobile && (
        <TableCell>
          <Stack direction='row' alignItems='center' spacing={2}>
            <MembershipIcon />

            <Typography variant='body2'>{membershipType}</Typography>
          </Stack>
        </TableCell>
      )}

      <TableCell align='right'>
        <DatePicker value={premiumUntil} onChange={handleToDateChange} />
      </TableCell>

      {!isMobile && <TableCell align='right'>{daysRemaining} days</TableCell>}
    </TableRow>
  )
}

export default UsersTableRow
