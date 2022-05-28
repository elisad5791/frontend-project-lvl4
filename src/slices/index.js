import channelsReducer, {
  addChannel, setChannels, removeChannel, renameChannel,
} from './channelsSlice.js';
import messagesReducer, { addMessage, setMessages } from './messagesSlice.js';
import appReducer, {
  setActiveChannel, setDefaultChannel, setShowModal, setRequestState,
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
  setRequestState,
};
