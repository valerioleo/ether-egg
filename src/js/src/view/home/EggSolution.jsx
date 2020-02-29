import React, {useEffect, useState} from 'react';
import {Typography} from '@material-ui/core';
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
    <div style={{textAlign: 'center', padding: 50}}>
      <Typography>You have found a super rare Egg!</Typography>
      <div>
        <img src='https://i.giphy.com/media/ftegeAlQ32zFLEKjrk/giphy.webp' />
      </div>
      <AsyncButton
        onClick={onClaimEgg}
        asyncButtonText='Claim Egg NOW!'
        asyncResult={claimEggResult}
      />
    </div>

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

