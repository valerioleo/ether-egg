import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import SmartContractConnection from '../../bridge/SmartContractConnection';

const Home = props => {
  const {
    smartContract,
    callMethod
  } = props;

  const eggNumberResult = smartContract
    .safeGetIn(['callSmartContractMethodResult', 'eggNumber']);

  const generateIdResult = smartContract
    .safeGetIn(['callSmartContractMethodResult', 'generateId']);

  useEffect(() => {
    callMethod({
      contractInterface: 'EtherEgg',
      method: 'eggNumber',
      contractAddress: '0xbAC82883e0ac1085C074d0D55844ff049Eeb16e7',
      args: []
    });

    callMethod({
      contractInterface: 'EtherEgg',
      method: 'generateId',
      contractAddress: '0xbAC82883e0ac1085C074d0D55844ff049Eeb16e7',
      args: ['abc']
    });
  }, []);

  const eggsCount = eggNumberResult.mapPattern('Success', 0, ({data}) => data.get('result'));

  useEffect(() => {
    generateIdResult.mapPattern('Success', null, ({data}) => {
      const eggId = data.get('result');

      debugger

      callMethod({
        contractInterface: 'EtherEgg',
        method: 'layEgg',
        contractAddress: '0xbAC82883e0ac1085C074d0D55844ff049Eeb16e7',
        args: [eggId]
      });
    });
  }, [generateIdResult]);

  return (
    <>
      <Typography variant='h1'>Hunt your Egg! {eggsCount}</Typography>
      <Typography variant='body2'>To start hunting, use type your solution in the input box.</Typography>
    </>
  );
};

export default SmartContractConnection(Home);

