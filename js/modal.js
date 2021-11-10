import {isEscapeKey} from './util.js';

const closeModal = (nameModal) => {
  nameModal.remove();

  document.removeEventListener('keydown', (evt) => {
    isEscapeKey(evt) ? closeModal(nameModal) : false;
  });
};

const openModal = (nameModal) => {
  document.body.append(nameModal);

  document.addEventListener('keydown', (evt) => {
    isEscapeKey(evt) ? closeModal(nameModal) : false;
  });
  nameModal.addEventListener('click', () => {
    closeModal(nameModal);
  });
};

export {openModal};
