import React from 'react';
import classnames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import styles from './styles';

const Section = props => {
  const {
    classes,
    Commands,
    Label,
    title,
    subtitle,
    children,
    fullWidth
  } = props;

  const renderLabel = () => Label
    ? <div className={classes.labelBox}><Label/></div>
    : null;

  const containerClassNames = classnames({
    [classes.root]: true,
    [classes.fullWidth]: !!fullWidth
  });

  return (
    <div className={containerClassNames}>
      <Grid container justify="space-between" alignItems='flex-end' direction='row' className={classes.sectionHeader}>
        <Grid item xs className={classes.sectionHeaderText}>
          <Grid container alignItems='center'>
            <Typography variant='h5'>{title}</Typography>
            {renderLabel()}
          </Grid>
          <Typography variant='body2'>{subtitle}</Typography>
        </Grid>
        <Grid item>
          {Commands}
        </Grid>
      </Grid>
      {children}
    </div>
  );
};

export default withStyles(styles)(Section);
