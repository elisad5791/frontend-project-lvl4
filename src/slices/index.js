import channelsReducer, {
  addChannel, setChannels, removeChannel, renameChannel, channelsSelectors,
} from './channelsSlice.js';
import messagesReducer, { addMessage, setMessages, messagesSelectors } from './messagesSlice.js';
import appReducer, {
  setActiveChannel, setDefaultChannel, setShowModal, setRequestState,
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
  addMessage,
  setMessages,
  setActiveChannel,
  setDefaultChannel,
  setShowModal,
  setRequestState,
  showModal,
  hideModal,
  setModalType,
  setModalData,
};
