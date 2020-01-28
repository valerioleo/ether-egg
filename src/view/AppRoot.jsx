import React from 'react';
import {Provider} from 'react-redux';
import {render} from 'react-dom';
import '../common/fn';
import './app.scss';

export default (store, App, domContainer = 'root') => {
  const ProvidedApp = () => (
    <Provider store={store}>
      <App />
    </Provider>
  );

  render(
    <ProvidedApp />,
    document.getElementById(domContainer)
  );
};
