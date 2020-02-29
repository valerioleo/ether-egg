import React from 'react';
import FormField from './FormField';

export default ({
  input,
  label,
  meta: {touched, error},
  ...custom
}) => {
  const fieldName = touched
    ? error || label
    : label;

  return (
    <FormField
      error={Boolean(touched && error)}
      helperText={fieldName}
      {...input}
      {...custom}
    />
  );
};
