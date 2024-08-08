import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import backendAxios from '../api/backendAxios';
import backendAxios from '../api/backendAxios';

export const fetchRooms = createAsyncThunk(
    'rooms/fetchRooms',
    async () => {
      try {
        const response = await backendAxios.get('/rooms');
        return response.data;
      } catch (e) {
        return [];
      }
    }
);

const initialState = {
  roomList: [],
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRooms.fulfilled, (state, action) => {
      state.rooms = action.payload;
    });
  }
});

export default roomSlice.reducer;