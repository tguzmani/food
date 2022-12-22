import { startLoading, stopLoading, setError } from 'common/listeners'

const authListeners = {
  ...startLoading('readProfile', 'signIn'),
  ...stopLoading('readProfile', 'signIn'),
  ...setError('readProfile', 'signIn'),
}

export default authListeners
