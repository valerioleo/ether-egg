import React, {useEffect} from 'react';
import SmartContractConnection from '../../bridge/SmartContractConnection';
import SmartContractOperationForm from '../common/SmartContractOperationForm';
import EtherEggDefinition from '../../../../solidity/build/contracts/EtherEgg.json';

const Home = props => {
  const {methodName} = props;

  const operation = EtherEggDefinition.abi
    .filter(op => op.name === methodName)
    .map(op => ({
      ...op,
      contractInterface: 'EtherEgg',
      title: op.name
    }))[0];

  return (
    <SmartContractOperationForm
      operation={operation}
      contractInterface='EtherEgg'
      contractAddress='0xbAC82883e0ac1085C074d0D55844ff049Eeb16e7'
    />
  );
};

export default SmartContractConnection(Home);

