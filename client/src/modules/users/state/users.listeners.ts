import StoreModel from 'config/easy-peasy.store.model';
import UsersStoreModel, { UsersState } from './users.store.model';
import { Actions, TargetResolver, actionOn } from 'easy-peasy';

const usersListeners = {
  onSetUser: actionOn<UsersState, Actions, any>(
    (actions: any) => actions.setUser,
    (state: UsersState, target) => {
      state.loading = false
    }
  ),
}

export default usersListeners
