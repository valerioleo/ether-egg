import {handleActions} from 'redux-actions';
import {Map} from 'immutable';
import {AsyncData} from '../../common/fn/monads/AsyncData';
import {immutableGet} from '../../common/fn';
import {LOAD_PEOPLE, ADD_PERSON} from './peopleActions';

const handleLoadPeople = (state, {payload}) => state.set('loadPeopleResult', payload.map(immutableGet('results')));
const handleAddNewPerson = (state, {payload}) => state.set('addNewPersonResult', payload);

const PeopleModel = Map({
  loadPeopleResult: AsyncData.Empty(),
  addNewPersonResult: AsyncData.Empty()
});

export default handleActions({
  [LOAD_PEOPLE]: handleLoadPeople,
  [ADD_PERSON]: handleAddNewPerson
}, PeopleModel);
