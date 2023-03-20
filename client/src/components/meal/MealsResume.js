import { Stack } from '@mui/system'
import { useStoreState } from 'easy-peasy'
import React, { useState } from 'react'
import MealsResumeTable from './MealsResumeTable'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import { Typography } from '@mui/material'
import MealViewType from './MealViewType'

const MealsResume = () => {
  const userIsPremium = useStoreState(state => state.users.userIsPremium)

  const [viewMode, setViewMode] = useState('numeric')

  const handleChangeViewMode = (_, mode) => {
    if (mode !== null) {
      setViewMode(mode)
    }
  }

  return (
    <>
      {userIsPremium ? (
        <>
          <MealViewType
            viewMode={viewMode}
            onChangeViewMode={handleChangeViewMode}
          />
          <MealsResumeTable viewMode={viewMode}/>
        </>
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
