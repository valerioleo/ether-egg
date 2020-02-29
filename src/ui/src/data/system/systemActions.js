import {createAction} from 'redux-actions';

export const PUSH_NOTIFICATION = 'SYSTEM::PUSH_NOTIFICATION';
export const RESET_NOTIFICATION = 'SYSTEM::RESET_NOTIFICATION';

export const pushNotification = notification => createAction(
  PUSH_NOTIFICATION
)(notification);

export const resetNotification = createAction(RESET_NOTIFICATION);

