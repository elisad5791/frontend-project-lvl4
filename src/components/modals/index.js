import AddChannel from './AddChannel.jsx';
import RemoveChannel from './RemoveChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import LoaderIcon from './LoaderIcon.jsx';

const getModal = (modalName) => {
  const modals = {
    adding: AddChannel,
    removing: RemoveChannel,
    renaming: RenameChannel,
    processing: LoaderIcon,
  };
  return modals[modalName];
};

export default getModal;
