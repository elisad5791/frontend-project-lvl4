import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice.js';

const initialState = {
  value: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessages: (state, action) => {
      state.value.push(...action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      state.value = state.value.filter((item) => item.channelId !== action.payload);
    });
  },
});

export const { addMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
