import {createAction} from 'redux-actions';
import {decodeMethod} from '../../utils/eth-utils/core/decode';
import {pushNotification} from '../system/systemActions';
import {getTransaction} from '../../utils/eth-utils/core/tx';
import {executeSmartContractMethod} from '../../services/smartContract';
import {importDefinition, getContractInstance} from '../../utils/eth-utils/contracts/Contract';
import {listenForReceipt} from '../../services/monitors';
import {partial} from '../../utils/fn';

export const LISTEN_FOR_CONFIRMATION = 'SMART_CONTRACT::LISTEN_FOR_CONFIRMATION';
export const CALL_METHOD = 'SMART_CONTRACT:CALL_METHOD';
export const GET_CONTRACT_EVENTS = 'SMART_CONTRACT:GET_CONTRACT_EVENTS';
export const RESET = 'SMART_CONTRACT:RESET';

export const GET_DEFAULT_ACCOUNT = 'ACCOUNT:GET_DEFAULT_ACCOUNT';

const appendTxData = async (abi, log) => {
  const txData = await getTransaction(log.transactionHash)
    .then(tx => ({
      ...tx,
      input: decodeMethod(abi, tx.input)
    }));

  return {
    ...log,
    txData
  };
};

export const callMethod = ({
  contractInterface,
  method,
  contractAddress,
  args = [],
  key = method
}) => {
  const async = executeSmartContractMethod(
    contractInterface,
    method,
    contractAddress,
    ...args
  );

  return createAction(
    CALL_METHOD
  )({async, key});
};

export const getEvents = ({
  contractInterface,
  contractAddress,
  eventName = 'allEvents',
  fromBlock = 0,
  toBlock = 'latest',
  withTxData = false,
  filterEvents
}) => {
  const runAsync = async () => {
    const {abi} = await importDefinition(contractInterface);
    const Contract = getContractInstance({abi}, contractAddress);
    let logs = await Contract.getPastEvents(eventName, {fromBlock, toBlock});

    if(filterEvents) {
      logs = logs.filter(elem => filterEvents.includes(elem.event));
    }

    return withTxData
      ? await Promise.all(logs.map(partial(appendTxData, abi)))
      : logs;
  };

  return createAction(
    GET_CONTRACT_EVENTS
  )({async: runAsync(), eventName, contractAddress});
};

export const resetAction = createAction(RESET);

export const listenForConfirmations = ({operationId, message, txHash}) => dispatch => {
  const runAsync = async () => {
    const result = await listenForReceipt(txHash).toPromise();
    dispatch(pushNotification({variant: 'success', message}));

    return result;
  };

  return dispatch(
    createAction(
      LISTEN_FOR_CONFIRMATION
    )({async: runAsync(), operationId, txHash})
  );
};
