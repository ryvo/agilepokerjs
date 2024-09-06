import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backendAxios from '../api/backendAxios';
import UserActionType from '../actions/userActionTypes';

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (username) => {
    const response = await backendAxios.post('/users', { name: username });
    return response.data;
  }
);

const initialState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(registerUser.settled, (state, action) => {
        state.loading = false;
      })
  }
});

export default userSlice.reducer;