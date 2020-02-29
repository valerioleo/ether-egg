import React from 'react';
import Typography from '@material-ui/core/Typography';
import SmartContractConnection from '../../bridge/SmartContractConnection';
import LayEggForm from './LayEggForm';

const LayEgg = () => {
  return (
    <>
      <Typography variant='h1'>Lay an Egg!</Typography>
      <Typography variant='body2'>To lay an Egg, type your secret word in the input box.</Typography>

      <LayEggForm/>
    </>
  );
};

export default SmartContractConnection(LayEgg);

