import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import taskMiddleware from '../middleware/taskMiddleware';

// create a store that has redux-thunk middleware enabled
export default reducer => createStore(
  reducer,
  applyMiddleware(taskMiddleware, thunk)
);
