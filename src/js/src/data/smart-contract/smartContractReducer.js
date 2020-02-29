import {handleActions} from 'redux-actions';
import {Map} from 'immutable';
import {AsyncData} from '../../utils/fn/monads/AsyncData';
import {createSafeAccessors} from '../../utils/data/safeAccessor';
import {
  CALL_METHOD,
  GET_CONTRACT_EVENTS,
  RESET,
  GET_DEFAULT_ACCOUNT,
  LISTEN_FOR_CONFIRMATION
} from './smartContractActions';

const handleCallMethod = (state, {payload}) => state.setIn(['callSmartContractMethodResult', payload.data.get('key')], payload);
const handleReset = state => state.set('callSmartContractMethodResult', AsyncData.Empty());
const handleGetContractEvents = (state, {payload}) => {
  const path = [
    'getContractEventsResult',
    payload.data.get('contractAddress'),
    payload.data.get('eventName')
  ];

  return state.setIn(path, payload.map(d => d.get('list')));
};

const handleListenForConfirmation = (state, {payload}) => state.setIn(['pendingTransactions', payload.data.get('operationId')], payload);
const handleGetDefaultAccount = (state, {payload}) => state.set('getDefaultAccountResult', payload);

const SafeMap = createSafeAccessors(AsyncData.Empty())(Map);

const Model = Map({
  callSmartContractMethodResult: SafeMap({}),
  getContractEventsResult: SafeMap({}),
  getDefaultAccountResult: AsyncData.Empty(),
  pendingTransactions: SafeMap({})
});

export default handleActions({
  [CALL_METHOD]: handleCallMethod,
  [GET_CONTRACT_EVENTS]: handleGetContractEvents,
  [RESET]: handleReset,
  [GET_DEFAULT_ACCOUNT]: handleGetDefaultAccount,
  [LISTEN_FOR_CONFIRMATION]: handleListenForConfirmation
}, Model);
