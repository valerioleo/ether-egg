import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {ignoreProp} from '../../../common/fn';
import Link from '../Link';
import InputElement from './InputElement';
import styles from './styles';

const FormField = props => {
  const {
    helperText,
    error,
    fieldName,
    formControlStyle,
    classes,
    fullWidth = true,
    margin = 'normal',
    innerProps = {},
    proposedValue,
    proposedValueLabel,
    onChange,
    value,
    ...rest
  } = props;

  const renderHelperText = () => (
    <FormHelperText className={error ? classes.errorLabel : undefined}>
      {helperText}
    </FormHelperText>
  );

  const renderFieldName = () => {
    const {fieldNameProps = {}} = innerProps;

    return fieldName
      ? (
        <Grid container justify='space-between'>
          <Typography
            variant='body1'
            fontWeight='bold'
            className={classes.fieldName}
            {...fieldNameProps}
          >
            {fieldName}
          </Typography>
          {proposedValueLabel && proposedValue !== value ? (
            <Link onClick={() => onChange(proposedValue)}>
              {proposedValueLabel}
            </Link>
          ) : null}
        </Grid>
      )
      : null;
  };

  return (
    <FormControl
      fullWidth={fullWidth}
      margin={margin}
      className={classes.root}
      style={formControlStyle}
    >
      {renderFieldName()}
      <InputElement
        error={error}
        onChange={onChange}
        value={value}
        {...ignoreProp('validator')(rest)}
      />
      {renderHelperText()}
    </FormControl>
  );
};

export default withStyles(styles)(FormField);
