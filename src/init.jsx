import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { toast } from 'react-toastify';
import store from './store/store.js';
import App from './components/app.jsx';
import translation from './locales/ru.js';
import apiContext from './contexts/apiContext.jsx';
import authContext from './contexts/authContext.jsx';
import auth from './auth.js';
import { addMessage } from './slices/messagesSlice.js';
import { addChannel, removeChannel, renameChannel } from './slices/channelsSlice.js';
import { setActiveChannel } from './slices/appSlice.js';

const apiInit = (socket, t) => {
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

  const api = {
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

  return api;
};

const init = async (socket) => {
  const i18nextInstance = i18next.createInstance();
  await i18nextInstance
    .use(initReactI18next)
    .init({
      lng: 'ru',
      interpolation: {
        escapeValue: false,
      },
      resources: {
        ru: {
          translation,
        },
      },
    });

  const api = apiInit(socket, i18nextInstance.t);

  const rollbarConfig = {
    accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18nextInstance}>
          <apiContext.Provider value={api}>
            <authContext.Provider value={auth}>
              <Provider store={store}>
                <App />
              </Provider>
            </authContext.Provider>
          </apiContext.Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
