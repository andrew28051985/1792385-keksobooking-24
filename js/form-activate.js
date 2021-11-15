const disabledForm = (classDisabled) => {
  const formClass = document.querySelector(classDisabled);
  formClass.classList.add('ad-form--disabled');
  const elementsSelect = formClass.querySelectorAll('fieldset');
  elementsSelect.forEach((element) => {
    element.disabled = true;
  });
};

const activateForm = (classAvtivate) => {
  const formClass = document.querySelector(classAvtivate);
  formClass.classList.remove('ad-form--disabled');
  const elementsSelect = formClass.querySelectorAll('fieldset');
  elementsSelect.forEach((element) => {
    element.disabled = false;
  });
};

export {activateForm, disabledForm};
