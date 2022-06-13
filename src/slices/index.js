import { combineReducers } from '@reduxjs/toolkit';
import channelsReducer, { actions as channelsActions, channelsSelectors } from './channelsSlice.js';
import messagesReducer, { actions as messagesActions, messagesSelectors } from './messagesSlice.js';
import appReducer, { actions as appActions } from './appSlice.js';
import modalReducer, { actions as modalActions } from './modalSlice.js';

const reducer = combineReducers({
  channels: channelsReducer,
  messages: messagesReducer,
  app: appReducer,
  modal: modalReducer,
});

export {
  reducer,
  messagesSelectors,
  channelsSelectors,
  channelsActions,
  messagesActions,
  appActions,
  modalActions,
};
