import configureStore from '../data';
import reducer from '../data/core/reducer';
import Router from './core/Router';
import bootstrap from './AppRoot';

const store = configureStore(reducer);

bootstrap(store, Router, 'root');
