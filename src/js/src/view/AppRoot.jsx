import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import withMuiTheme from './core/eeTheme';
import eeWebTheme from './core/muiTheme';
import '../utils/fn';
import './app.scss';

export default (store, App, domContainer = 'root') => {
  const ProvidedApp = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );

  const MuiThemedApp = withMuiTheme(ProvidedApp, eeWebTheme);

  render(
    <MuiThemedApp />,
    document.getElementById(domContainer)
  );
};
