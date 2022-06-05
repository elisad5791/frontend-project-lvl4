import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { io } from 'socket.io-client';
import ReactDOM from 'react-dom';
import '../assets/application.scss';
import init from './init.jsx';

window.onload = function hideLoader() {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(() => {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
};

const runApp = async () => {
  const socket = io();
  const vdom = await init(socket);
  ReactDOM.render(vdom, document.getElementById('chat'));
};

runApp();
