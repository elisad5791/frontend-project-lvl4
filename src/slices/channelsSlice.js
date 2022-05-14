/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.value = action.payload;
    },
    addChannel: (state, action) => {
      state.value.push(action.payload);
    },
    removeChannel: (state, action) => {
      const index = state.value.findIndex((channel) => channel.id === action.payload);
      if (index !== -1) state.value.splice(index, 1);
    },
    renameChannel: (state, action) => {
      const index = state.value.findIndex((channel) => channel.id === action.payload.id);
      if (index !== -1) state.value[index] = action.payload;
    },
  },
});

export const {
  addChannel, setChannels, removeChannel, renameChannel,
} = channelsSlice.actions;
export default channelsSlice.reducer;
