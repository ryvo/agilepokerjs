import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authMiddleware from './middleware/authMiddleware';
import userReducer from './slices/userSlice';
import roomReducer from './slices/roomSlice';

const rootReducer = combineReducers({
  user: userReducer,
  room: roomReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
});

export default store;