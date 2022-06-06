import { combineReducers } from '@reduxjs/toolkit';
import { store } from '..';
import auth from './auth';

export default combineReducers({
  auth,
});
