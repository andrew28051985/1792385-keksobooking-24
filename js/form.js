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

const minPrice = () => {
  if (formType.value === 'bungalow') {
    formPrice.placeholder = '0';
    formPrice.min = 0;
    return 0;
  } else if (formType.value === 'flat') {
    formPrice.placeholder = '1000';
    formPrice.min = 1000;
    return 1000;
  } else if (formType.value === 'hotel') {
    formPrice.placeholder = '3000';
    formPrice.min = 3000;
    return 3000;
  } else if (formType.value === 'house') {
    formPrice.placeholder = '5000';
    formPrice.min = 5000;
    return 5000;
  } else if (formType.value === 'palace') {
    formPrice.placeholder = '10000';
    formPrice.min = 10000;
    return 10000;
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

export {activateForm};
