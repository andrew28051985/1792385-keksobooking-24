import {resetMainMarker} from './map.js';
import {errorModal, openSuccessModal, openErrorModal, closeModal} from './modal.js';
import {setBorderFormError} from './util.js';
import {sendData}  from './api.js';
import {clearPhoto} from './photo.js';

const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_PRICE = 1000000;
const formAd = document.querySelector('.ad-form');
const formFilters = document.querySelector('.map__filters');
const formTitle = formAd.querySelector('#title');
const formPrice = formAd.querySelector('#price');
const formType = formAd.querySelector('#type');
const timeIn = formAd.querySelector('#timein');
const timeOut = formAd.querySelector('#timeout');
const roomNumber = formAd.querySelector('#room_number');
const capacity = formAd.querySelector('#capacity');
const address = formAd.querySelector('#address');
const capacityAll = capacity.querySelectorAll('option');
const errorButton = errorModal.querySelector('.error__button');

const type = {
  bungalow: {min: 0, placeholder: 0},
  flat: {min: 1000, placeholder: 1000},
  hotel: {min: 3000, placeholder: 3000},
  house: {min: 5000, placeholder: 5000},
  palace: {min: 10000, placeholder: 10000},
};

const onInputValueMissing = (evt) => {
  const field = evt.target;
  if (field.validity.valueMissing) {
    field.setCustomValidity('Заполните обязательное поле.');
    setBorderFormError(field);
  }
};

formTitle.addEventListener('input', () => {
  const lengthTitle = formTitle.value.length;
  if (lengthTitle < MIN_LENGTH_TITLE) {
    formTitle.setCustomValidity(`Еще нужно ввести ${MIN_LENGTH_TITLE - lengthTitle} симв.`);
    setBorderFormError(formTitle);
  } else if (lengthTitle > MAX_LENGTH_TITLE) {
    formTitle.setCustomValidity(`Нужно удалить ${lengthTitle - MAX_LENGTH_TITLE} симв.`);
    setBorderFormError(formTitle);
  } else {
    formTitle.setCustomValidity('');
  }
  formTitle.reportValidity();
});

const setMinPrice = () => {
  formPrice.placeholder = type[formType.value].placeholder;
  formPrice.min = type[formType.value].min;
  return type[formType.value].min;
};

setMinPrice();
formType.addEventListener('input', () => {
  setMinPrice();
  formPrice.reportValidity();
});

formPrice.addEventListener('input', () => {
  const MIN_PRICE = setMinPrice();
  const lengthPrice = formPrice.value;

  if (lengthPrice < MIN_PRICE) {
    formPrice.setCustomValidity(`Укажите цену выше на ${MIN_PRICE - lengthPrice}руб.`);
    setBorderFormError(formPrice);
  } else if (lengthPrice > MAX_PRICE) {
    formPrice.setCustomValidity(`Укажите цену ниже на ${lengthPrice - MAX_PRICE} руб.`);
    setBorderFormError(formPrice);
  } else {
    formPrice.setCustomValidity('');
  }

  formPrice.reportValidity();
});

timeIn.addEventListener('input', (evt) => {
  timeOut.value = evt.target.value;
});
timeOut.addEventListener('input', (evt) => {
  timeIn.value = evt.target.value;
});

capacityAll[2].selected = true;
capacityAll.forEach((option) => {
  option.disabled = true;
});
capacityAll[2].disabled = false;
roomNumber.addEventListener('input', () => {
  capacityAll.forEach((option) => {
    option.disabled = true;
  });
  if (roomNumber.value === '1') {
    capacity.value = 1;
    capacityAll[2].disabled = false;
  } else if (roomNumber.value === '2') {
    capacity.value = 1;
    capacityAll[2].disabled = false;
    capacityAll[1].disabled = false;
  } else if (roomNumber.value === '3') {
    capacity.value = 1;
    capacityAll.forEach((option) => {
      option.disabled = false;
    });
    capacityAll[3].disabled = true;
  } else if (roomNumber.value === '100') {
    capacity.value = 0;
    capacityAll[3].disabled = false;
  }
});

const setAddress = (({lat, lng}) => {
  address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});
address.readOnly = 'true';

formAd.addEventListener('invalid', onInputValueMissing, true);

const resetForm = (form) => {
  const formInputs = form.querySelectorAll('input');
  formInputs.forEach((input) => {
    if (input.type === 'checkbox') {
      input.checked = false;
    } else {
      input.value = '';
    }
  });
  const formTextArea = form.querySelectorAll('textarea');
  formTextArea.forEach((textarea) => {
    textarea.value = '';
  });
  const formSelects = form.querySelectorAll('select');
  formSelects.forEach((select) => {
    const formSelectSelected = select.querySelector('[selected]');
    formSelectSelected.selected = true;
  });
  setMinPrice();
  capacity.value = 1;
};

const reset = ((modal) => {
  modal;
  resetForm(formAd);
  resetForm(formFilters);
  resetMainMarker();
  clearPhoto();
});

formAd.addEventListener('reset', (evt) => {
  evt.preventDefault();
  reset();
});

errorButton.addEventListener('click', () => {
  closeModal();
});

const sendUserFormData = (() => {
  formAd.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      new FormData(evt.target),
      () => reset(openSuccessModal()),
      () => openErrorModal(),
    );
  });
});

export {sendUserFormData, setAddress};
