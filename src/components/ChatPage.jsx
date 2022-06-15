import React, { useEffect } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import routes from '../routes.js';
import MessagesElement from './MessagesElement.jsx';
import ChannelsElement from './ChannelsElement.jsx';
import ChannelInfoElement from './ChannelInfoElement.jsx';
import MessageForm from './MessageForm.jsx';
import getModal from './modals/index.js';
import useAuth from '../hooks/useAuth.jsx';
import { actions, selectors } from '../slices/index.js';

function ChatPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const auth = useAuth();
  const { t } = useTranslation();
  const channels = useSelector(selectors.channels.selectAll);
  const activeChannelId = useSelector((state) => state.channels.activeChannel);
  const messages = useSelector(selectors.messages.selectAll)
    .filter((message) => message.channelId === activeChannelId);
  const modalType = useSelector((state) => state.modal.type);
  const ModalWindow = getModal(modalType);

  useEffect(() => {
    const getData = async () => {
      dispatch(actions.showModal({ type: 'processing' }));
      try {
        const token = auth.getToken();
        const headers = { Authorization: `Bearer ${token}` };
        const { data } = await axios.get(routes.dataPath(), { headers });
        batch(() => {
          dispatch(actions.setChannels(data.channels));
          dispatch(actions.setMessages(data.messages));
          dispatch(actions.setActiveChannel(data.currentChannelId));
          dispatch(actions.setDefaultChannel(data.currentChannelId));
        });
      } catch (e) {
        toast(t('errors.network'), { type: 'error' });
        auth.logout();
        history.replace({ pathname: routes.loginPagePath() });
      }
      dispatch(actions.hideModal());
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
