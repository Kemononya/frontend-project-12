import AddModale from './AddModale';

const modals = {
  adding: AddModale,
};

export default (modalName) => modals[modalName];
