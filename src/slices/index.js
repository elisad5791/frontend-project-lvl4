import { combineReducers } from '@reduxjs/toolkit';
import channelsReducer, { actions as channelsActions, channelsSelectors } from './channelsSlice.js';
import messagesReducer, { actions as messagesActions, messagesSelectors } from './messagesSlice.js';
import modalReducer, { actions as modalActions } from './modalSlice.js';

const reducer = combineReducers({
  channels: channelsReducer,
  messages: messagesReducer,
  modal: modalReducer,
});

const actions = {
  ...messagesActions,
  ...channelsActions,
  ...modalActions,
};

const selectors = {
  channels: channelsSelectors,
  messages: messagesSelectors,
};

export {
  reducer,
  selectors,
  actions,
};
