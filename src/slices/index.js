import channelsReducer, {
  addChannel, setChannels, removeChannel, renameChannel,
} from './channelsSlice.js';
import messagesReducer, { addMessage, setMessages } from './messagesSlice.js';
import appReducer, {
  setActiveChannel, setDefaultChannel, setShowModal, setButtonsBlocked,
} from './appSlice.js';

export {
  channelsReducer,
  messagesReducer,
  appReducer,
  addChannel,
  setChannels,
  removeChannel,
  renameChannel,
  addMessage,
  setMessages,
  setActiveChannel,
  setDefaultChannel,
  setShowModal,
  setButtonsBlocked,
};
