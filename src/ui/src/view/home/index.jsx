import React, {useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import SmartContractConnection from '../../bridge/SmartContractConnection';
import EggSolution from './EggSolution';

const Home = props => {
  const {
    callMethod
  } = props;

  useEffect(() => {
    callMethod({
      contractInterface: 'EtherEgg',
      method: 'eggNumber',
      contractAddress: '0xbAC82883e0ac1085C074d0D55844ff049Eeb16e7',
      args: []
    });
  }, []);

  return (
    <>
      <Typography variant='h1'>Hunt your Egg!</Typography>
      <Typography variant='body2'>To start hunting, use type your solution in the input box.</Typography>
      <EggSolution/>
    </>
  );
};

export default SmartContractConnection(Home);

