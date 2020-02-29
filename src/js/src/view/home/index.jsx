import React from 'react';
import Typography from '@material-ui/core/Typography';
import SmartContractConnection from '../../bridge/SmartContractConnection';
import EggSolution from './EggSolution';

const Home = () => {
  return (
    <>
      <Typography variant='h1'>Hunt your Egg!</Typography>
      <Typography variant='body2'>To start hunting, use type your solution in the input box.</Typography>
      <EggSolution methodName='generateId'/>
      <EggSolution methodName='layEgg'/>
    </>
  );
};

export default SmartContractConnection(Home);

