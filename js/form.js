const disabledForm = (classDisabled) => {
  const formClass = document.querySelector(classDisabled);
  formClass.classList.add('ad-form--disabled');
  const elementsSelect = formClass.querySelectorAll('select');
  elementsSelect.forEach((element) => {
    element.disabled = true;
  });
  const elementsInput = formClass.querySelectorAll('input');
  elementsInput.forEach((element) => {
    element.disabled = true;
  });
  const elementsTextarea = formClass.querySelectorAll('textarea');
  elementsTextarea.forEach((element) => {
    element.disabled = true;
  });
  const elementsButton = formClass.querySelectorAll('button');
  elementsButton.forEach((element) => {
    element.disabled = true;
  });
};

const activateForm = (classAvtivate) => {
  const formClass = document.querySelector(classAvtivate);
  formClass.classList.remove('ad-form--disabled');
  const elementsSelect = formClass.querySelectorAll('select');
  elementsSelect.forEach((element) => {
    element.disabled = false;
  });
  const elementsInput = formClass.querySelectorAll('input');
  elementsInput.forEach((element) => {
    element.disabled = false;
  });
  const elementsTextarea = formClass.querySelectorAll('textarea');
  elementsTextarea.forEach((element) => {
    element.disabled = false;
  });
  const elementsButton = formClass.querySelectorAll('button');
  elementsButton.forEach((element) => {
    element.disabled = false;
  });
};

disabledForm('.map__filters');
disabledForm('.ad-form');

const formAd = document.querySelector('.ad-form');
const formTitle = formAd.querySelector('#title');
const formPrice = formAd.querySelector('#price');
const formType = formAd.querySelector('#type');
const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_PRICE = 1000000;

formTitle.addEventListener('input', () => {
  const lengthTitle = formTitle.value.length;

  if (lengthTitle < MIN_LENGTH_TITLE) {
    formTitle.setCustomValidity(`Еще нужно ввести ${MIN_LENGTH_TITLE - lengthTitle} симв.`);
  } else if (lengthTitle > MAX_LENGTH_TITLE) {
    formTitle.setCustomValidity(`Нужно удалить ${lengthTitle - MAX_LENGTH_TITLE} симв.`);
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
  if (formType.value === 'bungalow') {
    formPrice.placeholder = type.bungalow.placeholder;
    formPrice.min = type.bungalow.min;
    return type.bungalow.min;
  } else if (formType.value === 'flat') {
    formPrice.placeholder = type.flat.placeholder;
    formPrice.min = type.flat.min;
    return type.flat.min;
  } else if (formType.value === 'hotel') {
    formPrice.placeholder = type.hotel.placeholder;
    formPrice.min = type.hotel.min;
    return type.hotel.min;
  } else if (formType.value === 'house') {
    formPrice.placeholder = type.house.placeholder;
    formPrice.min = type.house.min;
    return type.house.min;
  } else if (formType.value === 'palace') {
    formPrice.placeholder = type.palace.placeholder;
    formPrice.min = type.palace.min;
    return type.palace.min;
  }
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
  } else if (lengthPrice > MAX_PRICE) {
    formPrice.setCustomValidity(`Укажите цену ниже на ${lengthPrice - MAX_PRICE} руб.`);
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
//блокирую все варианты с выбором кол-ва гостей
capacityAll.forEach((option) => {
  option.disabled = true;
});
//открываю вариант с 1 гостем, т.к. выбрана по умолчанию 1 комната
capacityAll[2].disabled = false;
//отслеживаем выбор кол-ва комнат
roomNumber.addEventListener('input', () => {
  //блокирую все варианты с выбором кол-ва гостей
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

address.value = '35.6895, 139.692';
address.setAttribute('readonly', true);

export {activateForm};
