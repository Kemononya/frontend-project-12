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
    addChannel(state, { payload }) {
      state.channels.push(payload);
    },
    renameChannel(state, { payload }) {
      const curChannel = state.channels.find(({ id }) => id === payload.id);
      curChannel.name = payload.name;
    },
    removeChannel(state, { payload }) {
      const newChannelsList = state.channels.filter(({ id }) => id !== payload.id);
      state.channels = newChannelsList;
      state.curChannelId = 1;
    },
    setCurChannelId(state, { payload }) {
      state.curChannelId = payload;
    },
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
