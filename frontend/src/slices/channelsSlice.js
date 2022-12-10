/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  curChannelId: 1,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannels(state, { payload }) {
      state.channels = payload;
    },
    setCurChannelId(state, { payload }) {
      state.curChannelId = payload;
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
