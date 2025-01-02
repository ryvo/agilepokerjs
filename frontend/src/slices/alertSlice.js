import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import backendAxios from '../api/backendAxios';
import LocalStorageService from '../service/LocalStorageService';

const initialState = { alerts: [] };

const userSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    showError: (state, action) => {
      state.alerts.push({
        type: 'error',
        message: action.payload.message || '',
      });
    }
  }
});

export default userSlice.reducer;