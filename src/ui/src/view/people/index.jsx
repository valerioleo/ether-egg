import React, {useEffect, useState} from 'react';
import Section from '../common/Section';
import Button from '../common/Button';
import Person from './Person';
import AddPersonForm from './AddPersonForm';
import PeopleConnection from '../../bridge/PeopleConnection';

const Home = props => {
  const {
    people,
    loadPeople
  } = props;

  const [openAddNewPersonModal, setOpenAddNewPersonModal] = useState(false);

  const loadPeopleResult = people.get('loadPeopleResult');
  const addNewPersonResult = people.get('addNewPersonResult');

  useEffect(() => {
    loadPeople();
  }, []);

  const renderPeople = () => loadPeopleResult.matchWith({
    Empty: () => 'Loading',
    Loading: () => 'Loading',
    Success: ({data}) => data.toJS().map(p => <Person key={p.url} {...p} />),
    Failure: ({error}) => `Something went wrong: ${error.message}`
  });

  const renderNewPerson = () => addNewPersonResult
    .mapPattern('Success', null, ({data}) => <Person {...data.toJS()}/>);

  return (
    <Section
      title='Meet our lovely people!'
      Commands={<Button onClick={() => setOpenAddNewPersonModal(true)}>Add new person</Button>}
    >
      <AddPersonForm
        open={openAddNewPersonModal}
        onClose={() => setOpenAddNewPersonModal(false)}
      />
      {renderNewPerson()}
      {renderPeople()}
    </Section>
  );
};

export default PeopleConnection(Home);
