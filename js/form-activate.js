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
  const elementsInput = formClass.querySelectorAll('input');
  elementsSelect.forEach((element) => {
    element.disabled = false;
  });
  [...elementsInput].some((element) => {
    if (element.disabled) {
      element.disabled = false;
      return true;
    }
  });
};

export {activateForm, disabledForm};
