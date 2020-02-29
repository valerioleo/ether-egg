import React from 'react';
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './styles';

const Spinner = props => (
  <Grid container justify='center' alignItems='center'>
    <CircularProgress
      className={props.classes.spinner}
      thickness={7}
      color={props.color}
      size={props.size}
    />
  </Grid>
);

export default withStyles(styles)(Spinner);
