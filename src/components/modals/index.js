import addChannel from './addChannel.jsx';
import removeChannel from './removeChannel.jsx';
import renameChannel from './renameChannel.jsx';

const getModal = (modalName) => {
  const modals = {
    adding: addChannel,
    removing: removeChannel,
    renaming: renameChannel,
  };
  return modals[modalName];
};

export default getModal;
