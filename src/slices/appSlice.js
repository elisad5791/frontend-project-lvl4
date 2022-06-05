/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeChannel: null,
  requestState: 'idle',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveChannel: (state, { payload }) => {
      state.activeChannel = payload;
    },
    setRequestState: (state, { payload }) => {
      state.buttonsBlocked = payload;
    },
  },
});

export const {
  setActiveChannel, setRequestState,
} = appSlice.actions;
export default appSlice.reducer;
