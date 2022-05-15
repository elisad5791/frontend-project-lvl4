import React, { useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import routes from '../routes.js';
import { setChannels } from '../slices/channelsSlice.js';
import { setMessages } from '../slices/messagesSlice.js';
import {
  setDefaultChannel, setActiveChannel, setAuthorized, setButtonsBlocked,
} from '../slices/appSlice.js';
import Messages from './messages.jsx';
import Channels from './channels.jsx';
import ChannelInfo from './channelInfo.jsx';
import MessageForm from './messageForm.jsx';

function Chat() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.value);
  const activeChannelId = useSelector((state) => state.app.activeChannel);
  const messages = useSelector((state) => state.messages.value
    .filter((item) => item.channelId === activeChannelId));

  useEffect(() => {
    dispatch(setAuthorized(true));

    const getData = async () => {
      dispatch(setButtonsBlocked(true));
      try {
        const userId = JSON.parse(localStorage.getItem('userId'));
        const headers = { Authorization: `Bearer ${userId.token}` };
        const { data } = await axios.get(routes.dataPath(), { headers });
        batch(() => {
          dispatch(setChannels(data.channels));
          dispatch(setMessages(data.messages));
          dispatch(setActiveChannel(data.currentChannelId));
          dispatch(setDefaultChannel(data.currentChannelId));
        });
      } catch (e) {
        toast(t('errors.network'), { type: 'error' });
      }
      dispatch(setButtonsBlocked(false));
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
