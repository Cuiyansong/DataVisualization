import { combineReducers } from 'redux'
import { data, counter } from './migration-map';

export default combineReducers({
  data,
  counter
});
