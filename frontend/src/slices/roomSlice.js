import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backendAxios from '../api/backendAxios';

export const fetchRoomList = createAsyncThunk(
    'rooms/fetchAll',
    async () => {
      const response = await backendAxios.get('/rooms');
      return response.data;
    }
);

export const createRoom = createAsyncThunk(
  'rooms/create',
  async (room) => {
    const response = await backendAxios.post('/rooms', room);
    return response.data;
  }
);

export const updateRoom = createAsyncThunk(
  'rooms/update',
  async (room) => {
    const response = await backendAxios.put(`/rooms/${room.id}`, room);
    return response.data;
  }
);

export const deleteRoom = createAsyncThunk(
  'rooms/delete',
  async (id) => {
    await backendAxios.delete(`/rooms/${id}`);
  }
);

const initialState = {
  roomList: [],
};

const roomSlice = createSlice({
  name: 'rooms',
  initialState,
  reducers: {
    openCreateRoomPopup: (state, action) => {
      state.popup = {
        visible: true,
        mode: 'create',
        okCallback: action.payload.okCallback,
        cancelCallback: action.payload.cancelCallback
      }
    },
    openEditRoomPopup: (state, action) => {
      state.popup = {
        visible: true,
        mode: 'edit',
        okCallback: action.payload.okCallback,
        cancelCallback: action.payload.cancelCallback
      }
    },
    closeRoomPopup: (state) => {
      state.popup = {
        visible: false,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // List rooms
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
      // Create a rooom
      .addCase(createRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // Delete a room
      .addCase(deleteRoom.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRoom.fulfilled, (state, action) => {
      })
      .addCase(deleteRoom.rejected, (state, action) => {
        state.error = action.error.message;
      })
      // Matchers
      .addMatcher(fetchRoomList.settled, (state, action) => {
        state.loading = false;
      })
      .addMatcher(createRoom.settled, (state, action) => {
        state.loading = false;
      })
      .addMatcher(deleteRoom.settled, (state, action) => {
        state.loading = false;
      })
  }
});

export const { openCreateRoomPopup, openEditRoomPopup, closeRoomPopup} = roomSlice.actions;
export default roomSlice.reducer;