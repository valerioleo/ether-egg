import {handleActions} from 'redux-actions';
import {Map} from 'immutable';
import {
  PUSH_NOTIFICATION,
  RESET_NOTIFICATION
} from './systemActions';

const handlePushNotification = (state, {payload}) => state.set('notification', payload);
const handleResetNotification = state => state.set('notification', {});

const SystemModel = Map({
  notification: {}
});

export default handleActions({
  [PUSH_NOTIFICATION]: handlePushNotification,
  [RESET_NOTIFICATION]: handleResetNotification
}, SystemModel);
