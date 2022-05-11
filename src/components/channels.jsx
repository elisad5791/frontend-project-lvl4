import React from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveChannel } from '../slices/appSlice.js';
import AddChannel from './addchannel.jsx';
import RemoveChannel from './removechannel.jsx';
import RenameChannel from './renamechannel.jsx';

const Channels = (props) => {
  const { channels } = props;
  const activeChannel = useSelector((state) => state.app.activeChannel);
  const dispatch = useDispatch();

  const handleClick = (id) => () => {
    dispatch(setActiveChannel(id));
  };

  return (
    <>
      <p>
        <AddChannel />
      </p>
      {channels.map((channel) => {
        const active = channel.id === activeChannel;
        const btnClass = cn('btn', {
          'btn-primary':  active,
          'btn-outline-primary': !active,
        });
        return (
          <p key={channel.id}>
            <button className={btnClass} onClick={handleClick(channel.id)}>{channel.name}</button>
            {channel.removable && <RemoveChannel id={channel.id} />}
            {channel.removable && <RenameChannel channel={channel} />}
          </p>
        );
      })}
    </>
  );
};

export default Channels;