import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import {compareAddress} from '../../utils/eth-utils/data/address';
import SmartContractConnection from '../../bridge/SmartContractConnection';

const contractAddress = ETHER_EGG_KOVAN_ADDRESS;

const MyBasket = props => {
  const {
    smartContract,
    getEvents,
    defaultAddress
  } = props;

  const getEventsResult = smartContract
    .safeGetIn(['getContractEventsResult', contractAddress, 'EggFound']);

  const getDefaultAccountResult = smartContract
    .get('getDefaultAccountResult');

  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    getDefaultAccountResult.mapPattern('Success', null, () => {
      getEvents({
        contractInterface: 'EtherEgg',
        contractAddress,
        eventName: 'EggFound'
      });
    });
  }, [getDefaultAccountResult]);

  useEffect(() => {
    getEventsResult.mapPattern('Success', null, ({data}) => {
      const events = data
        .toJS()
        // eslint-disable-next-line no-underscore-dangle
        .filter(evt => compareAddress(evt.returnValues._foundEggHunter, defaultAddress));

      setUserEvents(events);
    });
  }, [getEventsResult]);

  const renderUserEvents = () => userEvents.map(evt => (
    <Paper style={{padding: 15}} key={evt.transactionHash}>
      <Typography variant='caption'>EggID: {evt.returnValues._foundEggId}</Typography>
      <br/><br/>
      <Typography variant='body2' color='textSecondary'>Found with:</Typography>
      <Typography variant='h5' color='primary' style={{fontFamily: 'monospace'}}>{evt.returnValues.guess}</Typography>
    </Paper>
  ));

  return (
    <>
      <Typography variant='h3' fontWeight='bold'>My basket</Typography>
      <Typography variant='body2'>You can verify here all the Eggs you have already found.</Typography>
      <div style={{marginTop: 30}}>
        {
          getEventsResult.mapPattern('Success', 'Loading your eggs...', () => userEvents.length
            ? renderUserEvents()
            : <Typography>You don't have any egg.</Typography>)
        }
      </div>
    </>
  );
};

export default SmartContractConnection(MyBasket);
