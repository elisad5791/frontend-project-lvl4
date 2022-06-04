import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { messagesSelectors } from '../slices/index.js';

function ChannelInfoElement() {
  const { t } = useTranslation();
  const channels = useSelector((state) => state.channels.value);
  const activeChannelId = useSelector((state) => state.app.activeChannel);
  const index = channels.findIndex((item) => item.id === activeChannelId);
  const channelName = channels[index]?.name;

  const messages = useSelector(messagesSelectors.selectAll)
    .filter((message) => message.channelId === activeChannelId);
  const count = messages.length;

  return (
    <div className="p-3 border-bottom">
      <div className="fw-bold">
        #
        {' '}
        {channelName}
      </div>
      <div>
        {t('messages.message', { count })}
      </div>
    </div>
  );
}

export default ChannelInfoElement;
