// index.js
import { combineReducers } from 'redux';
import { headerReducer, detailReducer } from './reducers';

const rootReducer = combineReducers({
  header: headerReducer,
  detail: detailReducer,
});

export default rootReducer;
