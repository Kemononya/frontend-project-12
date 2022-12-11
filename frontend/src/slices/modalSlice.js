/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalType: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModalType(state, { payload }) {
      state.modalType = payload;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
