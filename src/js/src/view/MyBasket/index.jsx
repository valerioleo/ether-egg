import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Section from '../common/Section';
import {compareAddress} from '../../utils/eth-utils/data/address';
import SmartContractConnection from '../../bridge/SmartContractConnection';

const contractAddress = '0xbAC82883e0ac1085C074d0D55844ff049Eeb16e7';

const Home = props => {
  const {
    smartContract,
    getEvents,
    defaultAddress
  } = props;

  const getEventsResult = smartContract
    .safeGetIn(['getContractEventsResult', contractAddress, 'allEvents']);

  const getDefaultAccountResult = smartContract
    .get('getDefaultAccountResult');

  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    getDefaultAccountResult.mapPattern('Success', null, () => {
      getEvents({
        contractInterface: 'EtherEgg',
        contractAddress
      });
    });
  }, [getDefaultAccountResult]);

  useEffect(() => {
    getEventsResult.mapPattern('Success', null, ({data}) => {
      const events = data
        .toJS()
        .filter(evt => compareAddress(evt.returnValues.to, defaultAddress));

      setUserEvents(events);
    });
  }, [getEventsResult]);

  const renderUserEvents = () => userEvents.map(evt => (
    <Typography key={evt.transactionHash}>EggID: {evt.returnValues.tokenId}</Typography>
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
