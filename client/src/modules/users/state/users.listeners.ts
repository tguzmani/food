import { onError, startLoading, stopLoading } from 'common/listeners'
import { usersAuthThunksNames } from './auth/users.auth.thunks'
import { usersThunksNames } from './users.thunks'
import { ActionTypes, Actions, actionOn } from 'easy-peasy'
import { UsersState } from './users.store.model'
import StoreFeedbackFactory from 'common/store-feedback.factory'

const actionsNames = [...usersAuthThunksNames, ...usersThunksNames]

type ActionsTypes = 'startType' | 'successType' | 'failType'

const actionsByType = (actions: any, type: ActionsTypes) =>
  actionsNames.map(actionName => actions[actionName][type])

const usersListeners = {
  startLoading: actionOn(
    (actions: Actions<UsersState>) => actionsByType(actions, 'startType'), 
    (state: any) => {
      state.loading = true
    }
  ),

  stopLoading: actionOn(
    (actions: Actions<UsersState>) => actionsByType(actions, 'successType'), 
    (state: any) => {
      state.loading = false
    }
  ),

  onError: actionOn(
    (actions: Actions<UsersState>) => actionsByType(actions, 'failType'), 
    (state: any, target: any) => {
      state.loading = false
      state.feedback = StoreFeedbackFactory.error(target.error.response.data.error)
    }
  ),
}

export default usersListeners
