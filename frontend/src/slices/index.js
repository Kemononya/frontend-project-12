import { configureStore } from '@reduxjs/toolkit';
import channels from './channelsSlice';

export default configureStore({
  reducer: {
    channels,
  },
});
