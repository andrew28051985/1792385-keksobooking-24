import {isEscapeKey} from './util.js';

const successModal = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorModal = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorModal.querySelector('.error__button');

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

//открытие модальных окон
errorButton.addEventListener('click', () => {
  closeModal(errorModal);
});

export {openModal, closeModal, successModal, errorModal};
