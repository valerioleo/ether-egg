import React from 'react';
import {Field} from 'redux-form';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import {useUpdate} from '../../services/reactHooks';
import AsyncButton from '../common/AsyncButton';
import FormField from '../common/Form/FieldRenderer';
import Section from '../common/Section';
import PeopleConnection from '../../bridge/PeopleConnection';
import AddPersonFormConnection from '../../bridge/forms/AddPersonFormConnection';

const PersonForm = props => {
  const {
    people,
    handleSubmit,
    open,
    onClose,
    onSuccess = onClose
  } = props;

  useUpdate(() => {
    const addNewPersonResult = people.get('addNewPersonResult');
    addNewPersonResult.mapPattern('Success', false, onClose);
  });

  return (
    <Modal open={open} onClose={onClose}>
      <Paper style={{maxWidth: 300, padding: 15, margin: 'auto'}}>
        <Section
          title='Add new person'
          subtitle='Use this fields to manually add a new person.'
        >
          <Field
            name='name'
            fullWidth
            label='Name'
            helperText='Name.'
            component={FormField}
          />

          <Field
            name='hair_color'
            fullWidth
            label='Hair color'
            helperText='Hair color'
            component={FormField}
          />

          <AsyncButton
            onClick={handleSubmit}
            asyncButtonText='SAVE'
            asyncResult={people.get('addNewPersonResult')}
            successMessage='New person created successfully!'
            onSuccess={onSuccess}
          />
        </Section>
      </Paper>
    </Modal>
  );
};

export default PeopleConnection(
  AddPersonFormConnection(
    PersonForm
  )
);
