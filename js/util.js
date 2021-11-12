const ALERT_SHOW_TIME = 5000;

const showAlert = (message) => {   //функция генерации сообщения об ошибке
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 999;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = '50vh';
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.color = '#ffffff';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {        //Сделать через время
    alertContainer.remove();  //удалить блок сообщения
  }, ALERT_SHOW_TIME);        //через какое время удалить
};

//Нажатие на клавишу ESC
const isEscapeKey = (evt) => {
  if (evt.key === 'Escape') {
    return true;
  }
  return false;
};

//Подсветка инпута формы, если ошибка ввода
const borderFormError = (nameInput) => {
  nameInput.style.border = '2px solid #ff6547';
  nameInput.style.borderRadius = '4px';
};

function debounce (callback, timeoutDelay = 500) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}


export {showAlert, isEscapeKey, borderFormError, debounce};
