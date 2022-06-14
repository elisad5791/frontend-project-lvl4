import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import { io } from 'socket.io-client';
import ReactDOM from 'react-dom';
import '../assets/application.scss';
import init from './init.jsx';

const runApp = async () => {
  const socket = io();
  const vdom = await init(socket);
  ReactDOM.render(vdom, document.getElementById('chat'));
};

runApp();
