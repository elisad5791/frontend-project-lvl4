import React, { useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import routes from '../routes.js';
import MessagesElement from './messagesElement.jsx';
import ChannelsElement from './channelsElement.jsx';
import ChannelInfoElement from './channelInfoElement.jsx';
import MessageForm from './messageForm.jsx';
import ModalWindow from '../modal.jsx';
import useAuth from '../hooks/useAuth.jsx';
import {
  setChannels,
  setMessages,
  setDefaultChannel,
  setActiveChannel,
  setRequestState,
  messagesSelectors,
  channelsSelectors,
} from '../slices/index.js';

function ChatPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useAuth();
  const { t } = useTranslation();
  const channels = useSelector(channelsSelectors.selectAll);
  const activeChannelId = useSelector((state) => state.app.activeChannel);
  const messages = useSelector(messagesSelectors.selectAll)
    .filter((message) => message.channelId === activeChannelId);

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
          <ChannelsElement channels={channels} />
        </Col>
        <Col xs={9} className="h-100 p-0 d-flex flex-column">
          <ChannelInfoElement />
          <MessagesElement messages={messages} />
          <MessageForm />
        </Col>
      </Row>
      <ToastContainer />
      <ModalWindow />
    </Container>
  );
}

export default ChatPage;
