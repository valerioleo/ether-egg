import React from 'react';
import classnames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '../Button';
import CustomSpinner from '../Spinner';
import {useUpdate} from '../../../services/reactHooks';
import SystemConnection from '../../../bridge/SystemConnection';
import {noop, constant} from '../../../common/fn';
import styles from './styles';

const AsyncButton = props => {
  const {
    classes,
    color,
    asyncResult,
    onClick,
    asyncButtonText,
    disabled,
    disabledReason,
    errorMessage = 'An error occurred: ',
    successMessage = 'Saved Successfully',
    pushNotification,
    onSuccess = noop,
    onError = noop,
    onLoading = noop,
    hideSuccessNotification = false,
    hideErrorNotification = false,
    interactiveTooltip,
    overrideIsLoading = false
  } = props;

  const onUpdate = () => asyncResult.matchWith({
    Empty: noop,
    Loading: onLoading,
    Success: ({data}) => {
      if(!hideSuccessNotification) {
        pushNotification({variant: 'success', message: successMessage});
      }
      onSuccess(data);
    },
    Failure: ({error}) => {
      if(!hideErrorNotification) {
        pushNotification({variant: 'error', message: errorMessage + error});
      }
      onError({error});
    }
  });

  useUpdate(onUpdate, [asyncResult]);

  const isLoading = asyncResult
    .mapPattern('Loading', overrideIsLoading, constant(true));

  const validateOnClick = e => {
    if(!isLoading) {
      onClick(e);
    }
  };

  const checkForConfirmation = e => {
    validateOnClick(e);
  };

  const renderSpinner = () => <CustomSpinner size={20}/>;

  return (
    <Button
      fullWidth
      color={color}
      interactiveTooltip={interactiveTooltip}
      disabled={disabled || isLoading}
      disabledReason={isLoading && !disabled ? undefined : disabledReason}
      onClick={checkForConfirmation}
    >
      {isLoading ? renderSpinner() : asyncButtonText}
    </Button>
  );
};

export default withStyles(styles)(
  SystemConnection(AsyncButton)
);
