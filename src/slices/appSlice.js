import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  requestState: 'idle',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setRequestState: (state, { payload }) => ({ ...state, requestState: payload }),
  },
});

export const { setRequestState } = appSlice.actions;
export default appSlice.reducer;
