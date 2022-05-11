import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { io } from "socket.io-client";
import { Provider } from 'react-redux';
import i18next from 'i18next';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import store from './store/store.js';
import App from './components/app.jsx';
import translation from './locales/ru.js';

const socketContext = createContext();

const init = async () => {
  const socket = io("ws://localhost:5000");

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

  const rollbarConfig = {
    accessToken: 'f9aa7a47f9294f85ac8e430a09a38edf',
    captureUncaught: true,
    captureUnhandledRejections: true,
    environment: 'production',
  };

  ReactDOM.render(
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
    </RollbarProvider>,
    document.getElementById('chat')
  );
};

export { socketContext };
export default init;
