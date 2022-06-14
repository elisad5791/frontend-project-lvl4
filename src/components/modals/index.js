import addChannel from './addChannel.jsx';
import removeChannel from './removeChannel.jsx';
import renameChannel from './renameChannel.jsx';
import loaderIcon from './loaderIcon.jsx';

const getModal = (modalName) => {
  const modals = {
    adding: addChannel,
    removing: removeChannel,
    renaming: renameChannel,
    processing: loaderIcon,
  };
  return modals[modalName];
};

export default getModal;
