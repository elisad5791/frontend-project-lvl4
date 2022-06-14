import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
  type: 'adding',
  data: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, { payload }) => ({
      ...state, show: true, type: payload.type, data: payload.data,
    }),
    hideModal: (state) => ({ ...state, show: false }),
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
