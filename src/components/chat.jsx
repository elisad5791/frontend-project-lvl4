import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import filter from 'leo-profanity';
import routes from '../routes.js';
import { addChannels, removeChannel, renameChannel } from '../slices/channelsSlice.js';
import { addMessage } from '../slices/messagesSlice.js';
import { setActiveChannel } from '../slices/appSlice.js';
import { socketContext } from '../init.jsx';
import Messages from './messages.jsx';
import Channels from './channels.jsx';

const Chat = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  if (!userId) {
    let history = useHistory();
    history.replace({ pathname: "/login" });
  }

  filter.loadDictionary('ru');
  const { t } = useTranslation();
  const socket = useContext(socketContext);
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.value);
  const activeChannel = useSelector((state) => state.app.activeChannel);
  const messages = useSelector((state) => state.messages.value
    .filter((item) => item.channelId === activeChannel));

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: Yup.object({
      message: Yup.string()
        .required(t('errors.required')),
    }),
    onSubmit: (values) => {
      const username = localStorage.getItem('username');
      const text = filter.clean(values.message);
      socket.emit(
        "newMessage",
        { username, text, channelId: activeChannel },
        (response) => {console.log(`new message - ${response.status}`);});
    },
  });

  useEffect(() => {
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
    <>
    <h2>{t('chat')}</h2>
    <div className="container">
      <div className="row">
        <div className="col-4 border-end">
          <Channels channels={channels} />
        </div>
        <div className="col-8">
          <Messages messages={messages} />
          <form onSubmit={formik.handleSubmit}>
            <input
              id="message"
              name="message"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.message}
            />
            {formik.touched.message && formik.errors.message ? (
              <div>{formik.errors.message}</div>
            ) : null}
            <button type="submit">{t('messages.send')}</button>
          </form>
        </div>
      </div>
    </div>
    <ToastContainer />
    </>
  );
};

export default Chat;
