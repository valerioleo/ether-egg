import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import peopleReducer from '../people/peopleReducer';
import systemReducer from '../system/systemReducer';

export default combineReducers({
  form: formReducer,
  people: peopleReducer,
  system: systemReducer
});
