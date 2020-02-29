/* eslint-disable import/prefer-default-export */
import {asyncDataGet} from '../utils/fn';

export const getDefaultAccountFromState = state => state.smartContract
  .get('getDefaultAccountResult')
  .mapPattern('Success', '', asyncDataGet('defaultAccount'));

export const getContractEventFromState = (state, contractAddress, eventName) => state
  .safeGetIn(['getContractEventsResult', contractAddress, eventName]);
