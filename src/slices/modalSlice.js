import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
  type: null,
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

export const {
  showModal, hideModal, setModalType, setModalData,
} = modalSlice.actions;
export default modalSlice.reducer;
