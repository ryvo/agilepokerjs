import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backendAxios from '../api/backendAxios';

export const fetchRoomList = createAsyncThunk(
    'rooms/fetchRoomList',
    async () => {
      const response = await backendAxios.get('/rooms');
      return response.data;
    }
);

const initialState = {
  roomList: [],
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomList.fulfilled, (state, action) => {
        state.rooms = action.payload;
      })
      .addCase(fetchRoomList.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addMatcher(fetchRoomList.settled, (state, action) => {
        state.loading = false;
      })
  }
});

export default roomSlice.reducer;