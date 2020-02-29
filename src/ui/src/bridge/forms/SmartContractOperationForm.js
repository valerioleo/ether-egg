import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {addNewPerson} from '../../data/people/peopleActions';
import {required} from '../../services/form';

const validate = values => {
  const errors = {};
  const {
    name
  } = values;

  errors.name = required(name);

  return errors;
};

export default AddPersonFormConnection => {
  const Form = reduxForm({
    form: 'addPersonForm',
    validate,
    onSubmit: (values, dispatch) => dispatch(addNewPerson(values))
  })(AddPersonFormConnection);

  return connect()((Form));
};
