import { toast } from 'react-toastify';
import store from './store/store.js';
import {
  addChannel, removeChannel, renameChannel,
} from './slices/channelsSlice.js';
import { addMessage } from './slices/messagesSlice.js';
import { setActiveChannel } from './slices/appSlice.js';

const socketInit = (socket, t) => {
  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
    store.dispatch(setActiveChannel(channel.id));
    toast(t('channels.created'), { type: 'success' });
  });
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel(id));
    toast(t('channels.removed'), { type: 'success' });
  });
  socket.on('renameChannel', (channel) => {
    store.dispatch(renameChannel(channel));
    toast(t('channels.renamed'), { type: 'success' });
  });

  const connection = {
    sendMessage(data, cb) {
      socket.emit('newMessage', data, cb);
    },
    addChannel(data, cb) {
      socket.emit('newChannel', data, cb);
    },
    renameChannel(data, cb) {
      socket.emit('renameChannel', data, cb);
    },
    removeChannel(data, cb) {
      socket.emit('removeChannel', data, cb);
    },
  };

  return connection;
};

export default socketInit;
