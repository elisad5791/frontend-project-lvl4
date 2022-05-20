/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeChannel: null,
  defaultChannel: null,
  showModal: false,
  isAuthenticated: false,
  buttonsBlocked: false,
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
    setButtonsBlocked: (state, { payload }) => {
      state.buttonsBlocked = payload;
    },
    setAuthenticated: (state, { payload }) => {
      state.isAuthenticated = payload;
    },
  },
});

export const {
  setActiveChannel, setDefaultChannel, setShowModal, setAuthenticated, setButtonsBlocked,
} = appSlice.actions;
export default appSlice.reducer;
