import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { toast } from 'react-toastify';
import { configureStore } from '@reduxjs/toolkit';
import App from './components/App.jsx';
import AuthProvider from './components/AuthProvider.jsx';
import translation from './locales/ru.js';
import apiContext from './contexts/apiContext.jsx';
import { actions, reducer } from './slices/index.js';

const createPromise = (socket, type, data) => new Promise((resolve, reject) => {
  if (!socket.connected) {
    reject();
  }
  socket.emit(type, data, (response) => {
    if (response.status === 'ok') {
      resolve(response.data);
    }
    reject();
  });
});

const apiInit = (socket, store, t) => {
  socket.on('newMessage', (message) => {
    store.dispatch(actions.addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(actions.addChannel(channel));
    store.dispatch(actions.setActiveChannel(channel.id));
    toast(t('channels.created'), { type: 'success' });
  });
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(actions.removeChannel(id));
    toast(t('channels.removed'), { type: 'success' });
  });
  socket.on('renameChannel', (channel) => {
    const { id, name } = channel;
    store.dispatch(actions.renameChannel({ id, changes: { name } }));
    toast(t('channels.renamed'), { type: 'success' });
  });

  const api = {
    sendMessage(data) {
      return createPromise(socket, 'newMessage', data);
    },
    addChannel(data) {
      return createPromise(socket, 'newChannel', data);
    },
    renameChannel(data) {
      return createPromise(socket, 'renameChannel', data);
    },
    removeChannel(data) {
      return createPromise(socket, 'removeChannel', data);
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

  const store = configureStore({ reducer });

  const api = apiInit(socket, store, i18nextInstance.t);

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
            <Provider store={store}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </Provider>
          </apiContext.Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
