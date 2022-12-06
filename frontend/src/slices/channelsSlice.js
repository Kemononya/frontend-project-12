import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const channelsAdapter = createEntityAdapter();

const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsAdapter.getInitialState(),
  reducers: {
    addChannels: channelsAdapter.addMany,
  },
});

export const selectors = channelsAdapter.getSelectors((state) => state.channels);
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
