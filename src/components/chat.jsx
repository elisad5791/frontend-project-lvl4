import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import routes from '../routes.js';
import { addChannels, removeChannel, renameChannel } from '../slices/channelsSlice.js';
import { addMessage } from '../slices/messagesSlice.js';
import { setActiveChannel, setAuthorized } from '../slices/appSlice.js';
import { socketContext } from '../init.jsx';
import Messages from './messages.jsx';
import Channels from './channels.jsx';
import ChannelInfo from './channelInfo.jsx';
import MessageForm from './messageForm.jsx';

const Chat = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (!userId) {
    let history = useHistory();
    history.replace({ pathname: "/login" });
  }

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const socket = useContext(socketContext);
  const channels = useSelector((state) => state.channels.value);
  const activeChannelId = useSelector((state) => state.app.activeChannel);
  const messages = useSelector((state) => state.messages.value
    .filter((item) => item.channelId === activeChannelId));

  useEffect(() => {
    dispatch(setAuthorized(true));
    
    const getData = async () => {
      try {
        const headers = { Authorization: `Bearer ${userId.token}` };
        const { data } = await axios.get(routes.dataPath(), { headers });
        dispatch(addChannels(data.channels));
      } catch (e) {
        toast(t('errors.network'));
      }
    };
    getData();
    
    socket.on("newMessage", (message) => {
      dispatch(addMessage(message));
    });
    socket.on("newChannel", (channel) => {
      dispatch(addChannels([channel]));
      dispatch(setActiveChannel(channel.id));
      toast(t('channels.created'));
    });
    socket.on("removeChannel", ({ id }) => {
      dispatch(removeChannel(id));
      toast(t('channels.removed'));
    });
    socket.on("renameChannel", (channel) => {
      dispatch(renameChannel(channel));
      toast(t('channels.renamed'));
    });
  }, []);

  return (
    <Container className='shadow h-100'>
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
};

export default Chat;
