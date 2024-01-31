// store.js
import { createStore, combineReducers } from 'redux';
import { headerReducer, detailReducer } from './reducers';

// Combine reducers into a root reducer
const rootReducer = combineReducers({
  header: headerReducer,
  detail: detailReducer,
});

// Create the Redux store with the root reducer
const store = createStore(rootReducer);

export default store;
