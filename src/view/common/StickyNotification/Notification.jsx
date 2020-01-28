import React, {useState, useEffect} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import {withStyles} from '@material-ui/core/styles';
import {duration} from '../../../common/helpers/time';

const styles = theme => ({
  success: {
    backgroundColor: theme.palette.primary.dark
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  warning: {
    backgroundColor: theme.palette.error.dark
  }
});

const Notification = props => {
  const {
    classes,
    open,
    variant = 'info',
    message,
    ...rest
  } = props;

  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    const timeout = setTimeout(() => setIsOpen(false), duration.seconds(5));

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      ContentProps={{classes: {root: classes[variant]}}}
      open={isOpen}
      variant={variant}
      message={message}
      autoHideDuration={10}
      {...rest}
    />
  );
};

export default withStyles(styles)(Notification);
