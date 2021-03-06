import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, Button, ButtonGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions } from '../slices/index.js';

function Channels(props) {
  const { t } = useTranslation();
  const { channels } = props;
  const activeChannel = useSelector((state) => state.channels.activeChannel);
  const dispatch = useDispatch();

  const handleClick = (id) => () => {
    dispatch(actions.setActiveChannel(id));
  };

  const showModalAdd = () => {
    dispatch(actions.showModal({ type: 'adding' }));
  };

  const showModalRemove = (id) => () => {
    dispatch(actions.showModal({ type: 'removing', data: id }));
  };

  const showModalRename = (channel) => () => {
    dispatch(actions.showModal({ type: 'renaming', data: channel }));
  };

  return (
    <>
      <p className="lead d-flex justify-content-between align-items-center">
        {t('channels.title')}
        <Button variant="outline" onClick={showModalAdd} className="p-1 fs-3 lh-1 text-primary">+</Button>
      </p>
      {channels.map((channel) => {
        const { id, name, removable } = channel;
        const active = id === activeChannel;
        const variant = active ? 'primary' : 'secondary';
        return (
          <Dropdown as={ButtonGroup} className="w-100 mb-2" key={id}>
            <Button variant={variant} className="w-100 text-start" onClick={handleClick(id)}>
              #
              {' '}
              {name}
            </Button>
            {removable && (
              <>
                <Dropdown.Toggle split variant={variant}>
                  <span className="visually-hidden">{t('channels.control')}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu variant="light">
                  <Dropdown.Item onClick={showModalRemove(id)}>
                    {t('channels.removeButton')}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={showModalRename(channel)}>
                    {t('channels.renameButton')}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </>
            )}
          </Dropdown>
        );
      })}
    </>
  );
}

export default Channels;
