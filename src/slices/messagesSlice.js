import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { actions as channelsActions } from './channelsSlice.js';

const messagesAdapter = createEntityAdapter();
const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages: messagesAdapter.setAll,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(channelsActions.removeChannel, (state, { payload }) => {
      const keys = Object.values(state.entities)
        .filter((message) => message.channelId === payload)
        .map((message) => message.id);
      messagesAdapter.removeMany(state, keys);
    });
  },
});

export const { actions } = messagesSlice;
export const messagesSelectors = messagesAdapter.getSelectors((state) => state.messages);
export default messagesSlice.reducer;
