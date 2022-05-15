import React from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { toast } from 'react-toastify';
import store from './store/store.js';
import App from './components/app.jsx';
import translation from './locales/ru.js';
import socketContext from './contexts/context.jsx';
import {
  addChannel, removeChannel, renameChannel,
} from './slices/channelsSlice.js';
import { addMessage } from './slices/messagesSlice.js';
import { setActiveChannel } from './slices/appSlice.js';

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

  socket.on('newMessage', (message) => {
    store.dispatch(addMessage(message));
  });
  socket.on('newChannel', (channel) => {
    store.dispatch(addChannel(channel));
    store.dispatch(setActiveChannel(channel.id));
    toast(i18nextInstance.t('channels.created'), { type: 'success' });
  });
  socket.on('removeChannel', ({ id }) => {
    store.dispatch(removeChannel(id));
    toast(i18nextInstance.t('channels.removed'), { type: 'success' });
  });
  socket.on('renameChannel', (channel) => {
    store.dispatch(renameChannel(channel));
    toast(i18nextInstance.t('channels.renamed'), { type: 'success' });
  });

  const rollbarConfig = {
    accessToken: 'f9aa7a47f9294f85ac8e430a09a38edf',
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18nextInstance}>
          <socketContext.Provider value={socket}>
            <Provider store={store}>
              <App />
            </Provider>
          </socketContext.Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
