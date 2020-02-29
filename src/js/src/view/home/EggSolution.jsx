import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import SmartContractConnection from '../../bridge/SmartContractConnection';

const Home = props => {
  const {
    smartContract,
    callMethod
  } = props;

  const callSmartContractMethodResult = smartContract
    .safeGetIn(['callSmartContractMethodResult', 'eggNumber']);

  useEffect(() => {
    callMethod({
      contractInterface: 'EtherEgg',
      method: 'eggNumber',
      contractAddress: '0xbAC82883e0ac1085C074d0D55844ff049Eeb16e7',
      args: []
    });
  }, []);

  const eggsCount = callSmartContractMethodResult.mapPattern('Success', 0, ({data}) => data.get('result'));

  return (
    <>
      <Typography variant='h1'>Hunt your Egg! {eggsCount}</Typography>
      <Typography variant='body2'>To start hunting, use type your solution in the input box.</Typography>
    </>
  );
};

export default SmartContractConnection(Home);

