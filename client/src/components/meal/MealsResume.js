import { useStoreState } from 'easy-peasy'
import React from 'react'
import MealsResumeTable from './MealsResumeTable'
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium'
import { Typography } from '@mui/material'
import MealViewType from './MealViewType'
import Message from 'components/layout/Message'

const MealsResume = ({ viewMode, handleChangeViewMode }) => {
  const userIsPremium = useStoreState(state => state.users.userIsPremium)
  const { foods } = useStoreState(state => state.foods)

  return (
    <>
      {userIsPremium ? (
        <>
          {foods.length === 0 && (
            <Typography variant='body2' className='text-muted' align='center'>
              Add some foods to see your meals resume
            </Typography>
          )}
          {foods.length > 0 && (
            <>
              <MealViewType
                viewMode={viewMode}
                onChangeViewMode={handleChangeViewMode}
              />
              <MealsResumeTable viewMode={viewMode} />
            </>
          )}
        </>
      ) : (
        <Message
          sx={{ pt: 3, px: 1 }}
          Icon={WorkspacePremiumIcon}
          title='Premium feature'
        >
          Upgrade to premium to see your meals resume
        </Message>
      )}
    </>
  )
}

export default MealsResume
