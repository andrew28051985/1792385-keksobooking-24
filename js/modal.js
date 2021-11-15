import {onModalEscKeydown} from './util.js';

const successModal = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorModal = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

const closeModal = () => {
  successModal.remove();
  errorModal.remove();

  document.removeEventListener('keydown', onModalEscKeydown);
  successModal.removeEventListener('click', closeModal);
  errorModal.removeEventListener('click', closeModal);
};


const openSuccessModal = () => {
  document.body.append(successModal);

  document.addEventListener('keydown', onModalEscKeydown);
  successModal.addEventListener('click', closeModal);
};

const openErrorModal = () => {
  document.body.append(errorModal);

  document.addEventListener('keydown', onModalEscKeydown);
  errorModal.addEventListener('click', closeModal);
};

export {errorModal, openSuccessModal, openErrorModal, closeModal};
