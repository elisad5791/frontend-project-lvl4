/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice.js';

const initialState = {
  value: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.value = action.payload;
    },
    addMessage: (state, action) => {
      state.value.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      state.value = state.value.filter((item) => item.channelId !== action.payload);
    });
  },
});

export const { addMessage, setMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
