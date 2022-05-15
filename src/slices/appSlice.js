/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeChannel: null,
  defaultChannel: null,
  showModal: false,
  isAuthorized: false,
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
    setAuthorized: (state, { payload }) => {
      state.isAuthorized = payload;
    },
  },
});

export const {
  setActiveChannel, setDefaultChannel, setShowModal, setAuthorized, setButtonsBlocked,
} = appSlice.actions;
export default appSlice.reducer;
