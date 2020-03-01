import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import qs from 'qs';
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
    formData,
    location,
    initialize
  } = props;

  const {guess} = qs.parse(location.search, {ignoreQueryPrefix: true});

  const isEggClaimable = 'isEggClaimable';
  const claimEgg = 'claimEgg';

  const [correctGuess, setCorrectGuess] = useState();

  const huntEggResult = smartContract
    .safeGetIn(['callSmartContractMethodResult', isEggClaimable]);

  const claimEggResult = smartContract
    .safeGetIn(['callSmartContractMethodResult', isEggClaimable]);

  useEffect(() => {
    if(guess) {
      callMethod({
        contractInterface: 'EtherEgg',
        method: isEggClaimable,
        contractAddress: ETHER_EGG_KOVAN_ADDRESS,
        args: [guess]
      });

      initialize({solution: guess});
    }
  }, []);

  useEffect(() => {
    huntEggResult.mapPattern('Success', null, ({data}) => {
      const d = data.get('result');

      if(d && formData.SmartContractOperation) {
        setCorrectGuess(formData.SmartContractOperation.values.solution);
      }
    });
  }, [huntEggResult]);

  const onClaimEgg = () => callMethod({
    contractInterface: 'EtherEgg',
    method: claimEgg,
    contractAddress: ETHER_EGG_KOVAN_ADDRESS,
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
        contractAddress={ETHER_EGG_KOVAN_ADDRESS}
        title={title}
      />
    )
    : claimEggButton();
};

export default SmartContractConnection(
  SmartContractOperationFormConnection(
    withRouter(
      HuntEgg
    )
  )
);

