import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { setActiveChannel } from '../slices/index.js';
import AddChannelModal from './addChannelModal.jsx';
import RemoveChannelModal from './removeChannelModal.jsx';
import RenameChannelModal from './renameChannelModal.jsx';

function Channels(props) {
  const { t } = useTranslation();
  const { channels } = props;
  const activeChannel = useSelector((state) => state.app.activeChannel);
  const dispatch = useDispatch();
  const requestState = useSelector((state) => state.app.requestState);

  const handleClick = (id) => () => {
    dispatch(setActiveChannel(id));
  };

  return (
    <>
      <AddChannelModal />
      {channels.map((channel) => {
        const { id, name, removable } = channel;
        const active = id === activeChannel;
        const variant = active ? 'primary' : 'secondary';
        return (
          <Dropdown as={ButtonGroup} className="w-100 mb-2" key={id}>
            <Button variant={variant} className="w-100 text-start" onClick={handleClick(id)} disabled={requestState === 'processing'}>
              #
              {' '}
              {name}
            </Button>
            { removable && (
              <Dropdown.Toggle split variant={variant} disabled={requestState === 'processing'}>
                <span className="visually-hidden">{t('channels.control')}</span>
              </Dropdown.Toggle>
            )}
            { removable
              && (
              <Dropdown.Menu variant="light">
                <RemoveChannelModal id={id} />
                <RenameChannelModal channel={channel} />
              </Dropdown.Menu>
              )}
          </Dropdown>
        );
      })}
    </>
  );
}

export default Channels;
