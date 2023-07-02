import StoreModel from 'config/easy-peasy.store.model';
import UsersStoreModel, { UsersState } from './users.store.model';
import { Actions, TargetResolver, actionOn } from 'easy-peasy';
import { setError, startLoading, stopLoading } from 'common/listeners';
import { usersAuthThunksNames } from './auth/users.auth.thunks';
import { usersThunksNames } from './users.thunks';

const usersListeners = {
  ...startLoading(...usersAuthThunksNames),
  ...stopLoading(...usersAuthThunksNames),
  ...setError(...usersAuthThunksNames),

  ...startLoading(...usersThunksNames),
  ...stopLoading(...usersThunksNames),
  ...setError(...usersThunksNames),
}

export default usersListeners
