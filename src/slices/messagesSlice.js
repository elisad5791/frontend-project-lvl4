import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.value.push(action.payload);
    },
  },
});

export const { addMessage } = messagesSlice.actions;
export default messagesSlice.reducer;