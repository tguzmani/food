import { Stack } from '@mui/system'
import { useStoreState } from 'easy-peasy'
import React from 'react'
import MealsResumeTable from './MealsResumeTable'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import { Typography } from '@mui/material'

const MealsResume = () => {
  const userIsPremium = useStoreState(state => state.users.userIsPremium)

  return (
    <>
      {userIsPremium ? (
        <MealsResumeTable />
      ) : (
        <Stack alignItems='center' spacing={1.5}>
          <WorkspacePremiumIcon sx={{ color: 'grey.400', fontSize: '36px' }} />
          <Typography variant='body2' className='text-muted'>
            Upgrade to premium to see your meals resume
          </Typography>
        </Stack>
      )}
    </>
  )
}

export default MealsResume
