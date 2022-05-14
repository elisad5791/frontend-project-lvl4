import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setActiveChannel } from '../slices/appSlice.js';
import AddChannel from './addChannel.jsx';
import RemoveChannel from './removeChannel.jsx';
import RenameChannel from './renameChannel.jsx';

function Channels(props) {
  const { t } = useTranslation();
  const { channels } = props;
  const activeChannel = useSelector((state) => state.app.activeChannel);
  const dispatch = useDispatch();

  const handleClick = (id) => () => {
    dispatch(setActiveChannel(id));
  };

  return (
    <>
      <AddChannel />
      {channels.map((channel) => {
        const active = channel.id === activeChannel;
        const variant = active ? 'primary' : 'secondary';
        return (
          <Dropdown as={ButtonGroup} className="w-100 mb-2" key={channel.id}>
            <Button variant={variant} className="w-100 text-start" onClick={handleClick(channel.id)}>
              #
              {' '}
              {channel.name}
            </Button>
            { channel.removable && <Dropdown.Toggle split variant={variant} title={t('channels.control')} /> }
            { channel.removable
              && (
              <Dropdown.Menu variant="light">
                <RemoveChannel id={channel.id} />
                <RenameChannel channel={channel} />
              </Dropdown.Menu>
              )}
          </Dropdown>
        );
      })}
    </>
  );
}

export default Channels;
