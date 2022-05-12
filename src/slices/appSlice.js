import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  activeChannel: 1,
  showModal: false,
  isAuthorized: false,
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
    setAuthorized: (state, action) => {
      state.isAuthorized =  action.payload;
    },
  },
});

export const { setActiveChannel, setShowModal, setAuthorized } = appSlice.actions;
export default appSlice.reducer;