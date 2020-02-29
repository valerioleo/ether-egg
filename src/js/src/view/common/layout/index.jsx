import React from 'react';
import {withRouter} from 'react-router-dom';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Menu from '../Menu';
import styles from './styles';

const Layout = props => {
  const {children, classes, menuItems} = props;

  return (
    <>
      <div className={classes.navigationPosition}>
        <Typography
          align='left'
          variant='h5'
          fontWeight='bold'
        >
          Welcome to Star Wars Dom!
        </Typography>
        <Menu menu={menuItems}/>
      </div>
      <div className={classes.contentPosition}>
        <main>
          {children}
        </main>
      </div>
    </>
  );
};

export default withRouter(withStyles(styles)(Layout));
