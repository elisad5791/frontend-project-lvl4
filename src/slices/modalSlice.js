import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  type: 'adding',
  data: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, { payload }) => ({
      ...state, isOpen: true, type: payload.type, data: payload.data,
    }),
    hideModal: (state) => ({ ...state, isOpen: false }),
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
