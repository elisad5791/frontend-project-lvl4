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
    showModal: (state) => ({ ...state, show: true }),
    hideModal: (state) => ({ ...state, show: false }),
    setModalType: (state, { payload }) => ({ ...state, type: payload }),
    setModalData: (state, { payload }) => ({ ...state, data: payload }),
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
