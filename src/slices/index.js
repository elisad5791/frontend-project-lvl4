import channelsReducer, {
  addChannel, setChannels, removeChannel, renameChannel, channelsSelectors, setDefaultChannel,
} from './channelsSlice.js';
import messagesReducer, { addMessage, setMessages, messagesSelectors } from './messagesSlice.js';
import appReducer, {
  setActiveChannel, setRequestState,
} from './appSlice.js';
import modalReducer, {
  showModal, hideModal, setModalType, setModalData,
} from './modalSlice.js';

export {
  channelsReducer,
  messagesReducer,
  appReducer,
  modalReducer,
  messagesSelectors,
  channelsSelectors,
  addChannel,
  setChannels,
  removeChannel,
  renameChannel,
  setDefaultChannel,
  addMessage,
  setMessages,
  setActiveChannel,
  setRequestState,
  showModal,
  hideModal,
  setModalType,
  setModalData,
};
