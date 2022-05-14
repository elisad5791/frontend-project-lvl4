/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeChannel: null,
  defaultChannel: null,
  showModal: false,
  isAuthorized: false,
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveChannel: (state, action) => {
      state.activeChannel = action.payload;
    },
    setDefaultChannel: (state, action) => {
      state.defaultChannel = action.payload;
    },
    setShowModal: (state, action) => {
      state.showModal = action.payload;
    },
    setAuthorized: (state, action) => {
      state.isAuthorized = action.payload;
    },
  },
});

export const {
  setActiveChannel, setDefaultChannel, setShowModal, setAuthorized,
} = appSlice.actions;
export default appSlice.reducer;
