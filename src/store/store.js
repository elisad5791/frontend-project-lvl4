import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from '../slices/channelsSlice.js';
import messagesReducer from '../slices/messagesSlice.js';
import appReducer from '../slices/appSlice.js';

const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    app: appReducer,
  },
});

export default store;
