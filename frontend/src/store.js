import { configureStore, applyMiddleware, combineReducers } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import authReducer from './authReducer';
import authMiddleware from './authMiddleware';

const rootReducer = combineReducers({
  user: authReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, authMiddleware],
});

export default store;