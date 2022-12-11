import AddModal from './AddModal';

const modals = {
  adding: AddModal,
};

export default (modalName) => modals[modalName];
