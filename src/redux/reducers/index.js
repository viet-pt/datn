import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { progressReducer } from './progressReducer';
import { roleReducer } from './roleReducer';

export const rootReducer = combineReducers({
  userReducer,
  progressReducer,
  roleReducer,
});
