import channelsReducer, {
  addChannel,
  setChannels,
  removeChannel,
  renameChannel,
  channelsSelectors,
  setDefaultChannel,
  setActiveChannel,
} from './channelsSlice.js';
import messagesReducer, { addMessage, setMessages, messagesSelectors } from './messagesSlice.js';
import appReducer, {
  setRequestState,
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
  setActiveChannel,
  addMessage,
  setMessages,
  setRequestState,
  showModal,
  hideModal,
  setModalType,
  setModalData,
};
