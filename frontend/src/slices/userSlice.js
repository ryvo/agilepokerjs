import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backendAxios from '../api/backendAxios';
import LocalStorageService from '../service/LocalStorageService';
// import UserActionType from '../actions/userActionTypes';

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (username) => {
    const response = await backendAxios.post('/users', { name: username });
    return response.data;
  }
);

export const fetchUser = createAsyncThunk(
  'users/fetchUser',
  async (userId) => {
    const response = await backendAxios.get(`/users/${userId}`);
    return response.data;
  }
);

const initialState = {};

const userSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        LocalStorageService.setCurrentUser(action.payload);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
        LocalStorageService.unsetCurrentUser();
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addMatcher(registerUser.settled, (state, action) => {
        state.loading = false;
      })
      .addMatcher(fetchUser.settled, (state, action) => {
        state.loading = false;
      })
  }
});

export default userSlice.reducer;