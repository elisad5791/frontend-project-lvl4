import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeChannel: 1,
  showModal: false,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveChannel: (state, action) => {
      state.activeChannel =  action.payload;
    },
    setShowModal: (state, action) => {
      state.showModal =  action.payload;
    },
  },
});

export const { setActiveChannel, setShowModal } = appSlice.actions;
export default appSlice.reducer;