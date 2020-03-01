import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Section from '../common/Section';
import {compareAddress} from '../../utils/eth-utils/data/address';
import SmartContractConnection from '../../bridge/SmartContractConnection';

const contractAddress = ETHER_EGG_KOVAN_ADDRESS;

const Home = props => {
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
    // eslint-disable-next-line no-underscore-dangle
    <Typography key={evt.transactionHash}>EggID: {evt.returnValues._foundEggId} - {evt.returnValues.guess}</Typography>
  ));

  return (
    <Section title='Your Basket!'>
      {
        getEventsResult.mapPattern('Success', 'Loading your eggs...', () => userEvents.length
          ? renderUserEvents()
          : <Typography>You don't have any egg.</Typography>)
      }
    </Section>
  );
};

export default SmartContractConnection(Home);
