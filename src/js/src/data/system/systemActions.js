import {createAction} from 'redux-actions';
import {getDefaultAccount as getDefaultAccountWeb3} from '../../utils/eth-utils/data/address';

export const PUSH_NOTIFICATION = 'SYSTEM::PUSH_NOTIFICATION';
export const RESET_NOTIFICATION = 'SYSTEM::RESET_NOTIFICATION';
export const GET_DEFAULT_ACCOUNT = 'ACCOUNT:GET_DEFAULT_ACCOUNT';

export const getDefaultAccount = () => {
  const async = getDefaultAccountWeb3();

  return createAction(
    GET_DEFAULT_ACCOUNT
  )({async});
};

export const pushNotification = notification => createAction(
  PUSH_NOTIFICATION
)(notification);

export const resetNotification = createAction(RESET_NOTIFICATION);

