import React, {useState, useEffect} from 'react';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import withStyles from '@material-ui/core/styles/withStyles';
import CalendarIcon from '@material-ui/icons/CalendarToday';
import classnames from 'classnames';
import {isFunction, ignoreProp} from '../../../common/fn';
import styles from './styles';

const FormField = props => {
  const {
    error: errorProp,
    value: valueProp = '',
    validator,
    onChange,
    disabled,
    type,
    startAdornment,
    endAdornment,
    classes,
    InputProps = {},
    ...rest
  } = props;

  const [value, setValue] = useState(valueProp);
  const [error, setError] = useState(errorProp);

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  useEffect(() => {
    setError(errorProp);
  }, [errorProp]);

  const handleChange = ({target: {value}}) => {
    try {
      if(isFunction(validator)) {
        validator(value); // when possible, always prefer redux-form validations
      }

      if(isFunction(onChange)) {
        onChange(value);
      }

      setValue(value);
    }

    catch(err) {
      setValue(value);
      setError(err);
    }
  };

  const getAdornment = type => {
    const adornments = {
      date: <CalendarIcon/>
    };

    return adornments[type] && <InputAdornment>{adornments[type]}</InputAdornment>;
  };

  const inputClassnames = classnames({
    [classes.inputRoot]: true,
    [classes.crypto]: type === 'ethereum'
  });

  return (
    <Input
      error={error}
      disabled={disabled}
      type={type || ''}
      value={value}
      onChange={handleChange}
      startAdornment={startAdornment}
      endAdornment={endAdornment || getAdornment(type)}
      classes={{
        root: inputClassnames,
        focused: classes.inputRootFocused,
        error: classes.inputRootError
      }}
      {...InputProps}
      {...ignoreProp('validator')(rest)}
    />
  );
};

export default withStyles(styles)(FormField);
