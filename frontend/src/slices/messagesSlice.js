import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const messagesAdapter = createEntityAdapter();

const messagesSlice = createSlice({
  name: 'messages',
  initialState: messagesAdapter.getInitialState(),
  reducers: {
    addMessages: messagesAdapter.addMany,
  },
});

export const selectors = messagesAdapter.getSelectors((state) => state.messages);
export const { actions } = messagesSlice;
export default messagesSlice.reducer;
