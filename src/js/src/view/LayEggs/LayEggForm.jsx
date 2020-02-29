import React, {useEffect} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import {Typography} from '@material-ui/core';
import SmartContractConnection from '../../bridge/SmartContractConnection';
import SmartContractOperationForm from '../common/SmartContractOperationForm';
import EtherEggDefinition from '../../../../solidity/build/contracts/EtherEgg.json';
import {BN} from '../../utils/eth-utils/core/utils';

const LayEggForm = props => {
  const {
    title,
    smartContract,
    callMethod
  } = props;

  const generateId = 'generateId';
  const layEgg = 'layEgg';

  const generateIdResult = smartContract
    .safeGetIn(['callSmartContractMethodResult', generateId]);

  const layEggResult = smartContract
    .safeGetIn(['callSmartContractMethodResult', layEgg]);

  useEffect(() => {
    generateIdResult.mapPattern('Success', null, ({data}) => {
      const id = data.get('result');
      callMethod({
        contractInterface: 'EtherEgg',
        method: layEgg,
        contractAddress: '0xbAC82883e0ac1085C074d0D55844ff049Eeb16e7',
        args: [new BN(id)]
      });
    });
  }, [generateIdResult]);

  const generateIdOperation = EtherEggDefinition.abi
    .find(op => op.name === generateId);

  const isLayingEgg = layEggResult.mapPattern('Loading', false, () => true);

  return isLayingEgg
    ? (
      <div style={{textAlign: 'center', padding: 50}}>
        <Typography>To lay your Egg, confirm transaction on Metamask.</Typography>
        <CircularProgress />
        <div>
          <img src='https://i.giphy.com/media/3zoXQVUYUrw995ojf1/giphy.webp' />
        </div>
      </div>
    )
    : (
      <SmartContractOperationForm
        operation={generateIdOperation}
        contractInterface='EtherEgg'
        contractAddress='0xbAC82883e0ac1085C074d0D55844ff049Eeb16e7'
        title={title}
      />
    );
};

export default SmartContractConnection(LayEggForm);
