import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import authReducer from './reducers/authReducer';
import authMiddleware from './middleware/authMiddleware';
import roomReducer from './reducers/roomReducer';

const rootReducer = combineReducers({
  user: authReducer,
  room: roomReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([authMiddleware]),
});

export default store;