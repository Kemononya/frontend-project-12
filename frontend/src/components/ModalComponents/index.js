import AddModal from './AddModal';
import RenameModal from './RenameModal';

const modals = {
  adding: AddModal,
  renaming: RenameModal,
};

export default (modalName) => modals[modalName];
