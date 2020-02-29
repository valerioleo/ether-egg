import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Section from '../common/Section';
import Button from '../common/Button';
import Person from './Person';
import AddPersonForm from './AddPersonForm';
import SmartContractConnection from '../../bridge/SmartContractConnection';

const contractAddress = '0xbAC82883e0ac1085C074d0D55844ff049Eeb16e7';
const userAddress = '0xbAC82883e0ac1085C074d0D55844ff049Eeb16e7';

const Home = props => {
  const {
    smartContract,
    getEvents
  } = props;

  const getEventsResult = smartContract
    .safeGetIn(['getContractEventsResult', contractAddress, 'allEvents']);

  const [userEvents, setUserEvents] = useState([]);

  useEffect(() => {
    getEvents({
      contractInterface: 'EtherEgg',
      contractAddress
    });
  }, []);

  useEffect(() => {
    getEventsResult.mapPattern('Success', null, ({data}) => {
      const events = data
        .toJS()
        .filter(evt => evt.returnValues.to === userAddress);

      debugger
      setUserEvents(events);
    });
  }, [getEventsResult]);

  const renderUserEvents = () => userEvents.map(evt => (
    <Typography key={evt.transactionHash}>EggID: {evt.returnValues.tokenId}</Typography>
  ));

  return (
    <Section
      title='Your Basket!'
    >
      {renderUserEvents()}
    </Section>
  );
};

export default SmartContractConnection(Home);
