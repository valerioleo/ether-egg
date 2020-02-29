import {createAction} from 'redux-actions';
import fetch from '../../services/api';

export const LOAD_PEOPLE = 'PEOPLE::LOAD_PEOPLE';
export const ADD_PERSON = 'PEOPLE::ADD_PERSON';

export const loadPeopleRoot = fetch => () => {
  const async = fetch('/people', {method: 'GET'});

  return createAction(
    LOAD_PEOPLE
  )({async});
};

export const addNewPersonRoot = fetch => personData => {
  const async = fetch('/people', {method: 'POST', body: personData});

  return createAction(
    ADD_PERSON
  )({async});
};

// it just echoes back
const fakeFetch = (_, {body}) => new Promise(res => setTimeout(() => res(body), 1500));

export const loadPeople = loadPeopleRoot(fetch);
export const addNewPerson = addNewPersonRoot(fakeFetch);
