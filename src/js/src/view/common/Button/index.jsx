import React from 'react';
import classnames from 'classnames';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles';
import styles from './styles';

const CustomButton = props => {
  const {
    children,
    classes,
    variant,
    noMargin = false,
    color = 'primary',
    disabled,
    disabledReason = '',
    interactiveTooltip,
    fullWidth,
    ...restProps
  } = props;

  const rootClasses = classnames({
    [classes[color]]: true,
    [classes.noMargin]: noMargin,
    [classes.disabled]: disabled,
    [classes.fullWidth]: fullWidth
  });
  
  const wrapperClasses = classnames({
    [classes.wrapper]: true,
    [classes.fullWidth]: fullWidth
  });

  return (
    <Tooltip
      disableHoverListener={disabledReason ? !disabled : true}
      disableTouchListener={true}
      disableFocusListener={true}
      title={disabledReason}
      interactive={interactiveTooltip}
      placement="bottom"
    >
      <span className={wrapperClasses}>
        <Button
          variant={variant}
          classes={{root: rootClasses}}
          disabled={disabled}
          {...restProps}
        >
          {children}
        </Button>
      </span>
    </Tooltip>
  );
};

export default withStyles(styles)(CustomButton);
