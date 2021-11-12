import {resetMainMarker} from './map.js';
import {openModal, closeModal} from './modal.js';
import {borderFormError} from './util.js';
import {sendData}  from './api.js';

const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_PRICE = 1000000;
const formAd = document.querySelector('.ad-form');
const formFilters = document.querySelector('.map__filters');
const formTitle = formAd.querySelector('#title');
const formPrice = formAd.querySelector('#price');
const formType = formAd.querySelector('#type');
const successModal = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorModal = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorModal.querySelector('.error__button');

//Функция показа сообщения если поле пустое
const setEmptyFieldErrorMessage = (evt) => {
  const field = evt.target;
  if (field.validity.valueMissing) {
    field.setCustomValidity('Заполните обязательное поле.');
    borderFormError(field);
  }
};

formTitle.addEventListener('input', () => {
  const lengthTitle = formTitle.value.length;
  if (lengthTitle < MIN_LENGTH_TITLE) {
    formTitle.setCustomValidity(`Еще нужно ввести ${MIN_LENGTH_TITLE - lengthTitle} симв.`);
    borderFormError(formTitle);
  } else if (lengthTitle > MAX_LENGTH_TITLE) {
    formTitle.setCustomValidity(`Нужно удалить ${lengthTitle - MAX_LENGTH_TITLE} симв.`);
    borderFormError(formTitle);
  } else {
    formTitle.setCustomValidity('');
  }
  formTitle.reportValidity();
});

const type = {
  bungalow: {min: 0, placeholder: 0},
  flat: {min: 1000, placeholder: 1000},
  hotel: {min: 3000, placeholder: 3000},
  house: {min: 5000, placeholder: 5000},
  palace: {min: 10000, placeholder: 10000},
};

const minPrice = () => {
  formPrice.placeholder = type[formType.value].placeholder;
  formPrice.min = type[formType.value].min;
  return type[formType.value].min;
};

minPrice();
formType.addEventListener('input', () => {
  minPrice();
  formPrice.reportValidity();
});

formPrice.addEventListener('input', () => {
  const MIN_PRICE = minPrice();
  const lengthPrice = formPrice.value;

  if (lengthPrice < MIN_PRICE) {
    formPrice.setCustomValidity(`Укажите цену выше на ${MIN_PRICE - lengthPrice}руб.`);
    borderFormError(formPrice);
  } else if (lengthPrice > MAX_PRICE) {
    formPrice.setCustomValidity(`Укажите цену ниже на ${lengthPrice - MAX_PRICE} руб.`);
    borderFormError(formPrice);
  } else {
    formPrice.setCustomValidity('');
  }

  formPrice.reportValidity();
});

const timeIn = formAd.querySelector('#timein');
const timeOut = formAd.querySelector('#timeout');

timeIn.addEventListener('input', () => {
  if (timeIn.value === '12:00') {
    timeOut.value = '12:00';
  } else if (timeIn.value === '13:00') {
    timeOut.value = '13:00';
  } else if (timeIn.value === '14:00') {
    timeOut.value = '14:00';
  }
});
timeOut.addEventListener('input', () => {
  if (timeOut.value === '12:00') {
    timeIn.value = '12:00';
  } else if (timeOut.value === '13:00') {
    timeIn.value = '13:00';
  } else if (timeOut.value === '14:00') {
    timeIn.value = '14:00';
  }
});

const roomNumber = formAd.querySelector('#room_number');
const capacity = formAd.querySelector('#capacity');
const capacityAll = capacity.querySelectorAll('option');

//Выбор варианта для 1 гостя, т.к. выбрана по умолчанию 1 комната
capacityAll[2].selected = true;
//блокируем все варианты с выбором кол-ва гостей
capacityAll.forEach((option) => {
  option.disabled = true;
});
//открываем вариант с 1 гостем, т.к. выбрана по умолчанию 1 комната
capacityAll[2].disabled = false;
//отслеживаем выбор кол-ва комнат
roomNumber.addEventListener('input', () => {
  //блокируем все варианты с выбором кол-ва гостей
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

const address = formAd.querySelector('#address');
const setAddress = (({lat, lng}) => {
  address.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`;
});
address.setAttribute('readonly', true);

//Проверяем пустые поля всей формы
formAd.addEventListener('invalid', setEmptyFieldErrorMessage, true);

//Функция очистки формы
const resetForm = (form) => {
  const formInputs = form.querySelectorAll('input');
  formInputs.forEach((input) => {
    input.value = '';
    input.checked = false;
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
  minPrice();
  capacity.value = 1;
};

//Функция сброса
const reset = ((modal) => {
  modal;
  resetForm(formAd);
  resetForm(formFilters);
  resetMainMarker();
});

//Обработчик кнопки сброса
formAd.addEventListener('reset', (evt) => {
  evt.preventDefault();
  reset();
});
//закрытие модальных окон
errorButton.addEventListener('click', () => {
  closeModal(errorModal);
});

//Функция отправки данных на сервер по кнопке Опубликовать
const sendUserFormData = (() => {
  formAd.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      new FormData(evt.target),
      () => reset(openModal(successModal)),
      () => openModal(errorModal),
    );
  });
});

export {sendUserFormData, setAddress};
