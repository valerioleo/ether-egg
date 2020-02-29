import React, {useEffect} from 'react';
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

  const generateIdResult = smartContract
    .safeGetIn(['callSmartContractMethodResult', generateId]);

  useEffect(() => {
    generateIdResult.mapPattern('Success', null, ({data}) => {
      const id = data.get('result');
      callMethod({
        contractInterface: 'EtherEgg',
        method: 'layEgg',
        contractAddress: '0xbAC82883e0ac1085C074d0D55844ff049Eeb16e7',
        args: [new BN(id)]
      });
    });
  }, [generateIdResult]);

  const generateIdOperation = EtherEggDefinition.abi
    .find(op => op.name === generateId);

  return (
    <SmartContractOperationForm
      operation={generateIdOperation}
      contractInterface='EtherEgg'
      contractAddress='0xbAC82883e0ac1085C074d0D55844ff049Eeb16e7'
      title={title}
    />
  );
};

export default SmartContractConnection(LayEggForm);
