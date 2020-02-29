import React, {useEffect, useState} from 'react';
import SmartContractConnection from '../../bridge/SmartContractConnection';
import SmartContractOperationFormConnection from '../../bridge/forms/SmartContractOperationFormConnection';
import SmartContractOperationForm from '../common/SmartContractOperationForm';
import AsyncButton from '../common/AsyncButton';
import EtherEggDefinition from '../../../../solidity/build/contracts/EtherEgg.json';

const HuntEgg = props => {
  const {
    title,
    smartContract,
    callMethod,
    formData
  } = props;

  const isEggClaimable = 'isEggClaimable';
  const claimEgg = 'claimEgg';

  const [correctGuess, setCorrectGuess] = useState();

  const huntEggResult = smartContract
    .safeGetIn(['callSmartContractMethodResult', isEggClaimable]);

  const claimEggResult = smartContract
    .safeGetIn(['callSmartContractMethodResult', claimEgg]);

  useEffect(() => {
    huntEggResult.mapPattern('Success', null, ({data}) => {
      const d = data.get('result');

      if(d) {
        setCorrectGuess(formData.SmartContractOperation.values._solution);
      }
    });
  }, [huntEggResult]);

  const onClaimEgg = () => callMethod({
    contractInterface: 'EtherEgg',
    method: claimEgg,
    contractAddress: '0xbAC82883e0ac1085C074d0D55844ff049Eeb16e7',
    args: [correctGuess]
  });

  const claimEggButton = () => (
    <AsyncButton
      onClick={onClaimEgg}
      asyncButtonText='Claim Egg NOW!'
      asyncResult={claimEggResult}
    />

  );

  const isEggClaimableOperation = EtherEggDefinition.abi
    .find(op => op.name === isEggClaimable);

  return !correctGuess
    ? (
      <SmartContractOperationForm
        operation={isEggClaimableOperation}
        contractInterface='EtherEgg'
        contractAddress='0xbAC82883e0ac1085C074d0D55844ff049Eeb16e7'
        title={title}
      />
    )
    : claimEggButton();
};

export default SmartContractConnection(
  SmartContractOperationFormConnection(
    HuntEgg
  )
);

