/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, { payload }) => {
      state.value = payload;
    },
    addChannel: (state, { payload }) => {
      state.value.push(payload);
    },
    removeChannel: (state, { payload }) => {
      const index = state.value.findIndex((channel) => channel.id === payload);
      if (index !== -1) state.value.splice(index, 1);
    },
    renameChannel: (state, { payload }) => {
      const index = state.value.findIndex((channel) => channel.id === payload.id);
      if (index !== -1) state.value[index] = payload;
    },
  },
});

export const {
  addChannel, setChannels, removeChannel, renameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
