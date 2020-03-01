import React from 'react';
import Typography from '@material-ui/core/Typography';
import SmartContractConnection from '../../bridge/SmartContractConnection';
import EggSolution from './EggSolution';

const Home = () => {
  return (
    <>
      <Typography variant='h3' fontWeight='bold'>Howdy!</Typography>
      <Typography variant='body2'>To start hunting, use type your solution in the input box.</Typography>

      <EggSolution/>
    </>
  );
};

export default SmartContractConnection(Home);

