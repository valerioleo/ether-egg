import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import peopleReducer from '../people/peopleReducer';
import systemReducer from '../system/systemReducer';
import smartContractReducer from '../smart-contract/smartContractReducer';

export default combineReducers({
  form: formReducer,
  people: peopleReducer,
  smartContract: smartContractReducer,
  system: systemReducer
});
