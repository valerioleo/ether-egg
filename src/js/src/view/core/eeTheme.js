import React from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import eeStyles from './eeStyles';

const withCcTheme = (Component, styles = eeStyles) => function ThemedApp({props}) {
  return (
    <MuiThemeProvider theme={createMuiTheme(styles)}>
      <Component {...props} />
    </MuiThemeProvider>
  );
};

export default withCcTheme;
