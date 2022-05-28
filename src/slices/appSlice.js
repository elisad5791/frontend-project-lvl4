/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeChannel: null,
  defaultChannel: null,
  showModal: false,
  requestState: 'idle',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveChannel: (state, { payload }) => {
      state.activeChannel = payload;
    },
    setDefaultChannel: (state, { payload }) => {
      state.defaultChannel = payload;
    },
    setShowModal: (state, { payload }) => {
      state.showModal = payload;
    },
    setRequestState: (state, { payload }) => {
      state.buttonsBlocked = payload;
    },
  },
});

export const {
  setActiveChannel, setDefaultChannel, setShowModal, setRequestState,
} = appSlice.actions;
export default appSlice.reducer;
