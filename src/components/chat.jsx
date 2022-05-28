import React, { useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import routes from '../routes.js';
import Messages from './messages.jsx';
import Channels from './channels.jsx';
import ChannelInfo from './channelInfo.jsx';
import MessageForm from './messageForm.jsx';
import useAuth from '../hooks/useAuth.jsx';
import {
  setChannels,
  setMessages,
  setDefaultChannel,
  setActiveChannel,
  setRequestState,
} from '../slices/index.js';

function Chat() {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useAuth();
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.value);
  const activeChannelId = useSelector((state) => state.app.activeChannel);
  const messages = useSelector((state) => state.messages.value
    .filter((item) => item.channelId === activeChannelId));

  useEffect(() => {
    const getData = async () => {
      dispatch(setRequestState('processing'));
      try {
        const token = auth.getToken();
        const headers = { Authorization: `Bearer ${token}` };
        const { data } = await axios.get(routes.dataPath(), { headers });
        batch(() => {
          dispatch(setChannels(data.channels));
          dispatch(setMessages(data.messages));
          dispatch(setActiveChannel(data.currentChannelId));
          dispatch(setDefaultChannel(data.currentChannelId));
        });
      } catch (e) {
        toast(t('errors.network'), { type: 'error' });
        auth.logout();
        history.replace({ pathname: routes.loginPagePath() });
      }
      dispatch(setRequestState('idle'));
    };
    getData();
  }, []);

  return (
    <Container className="shadow h-100">
      <Row className="h-100">
        <Col xs={3} className="border-end h-100 p-3">
          <Channels channels={channels} />
        </Col>
        <Col xs={9} className="h-100 p-0 d-flex flex-column">
          <ChannelInfo />
          <Messages messages={messages} />
          <MessageForm />
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default Chat;
