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

export {activateForm};
