const getData = ((onSuccess, onFail) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error('Ошибка загрузки данных с сервера. Перезагрузите страницу.');
    })
    .then((response) => response.json())
    .then((ads) => {
      onSuccess(ads);
    })
    .catch((error) => {
      onFail(error);
    });
});

const sendData = ((body, onSuccess, onFail) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((responce) => {
      if (responce.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
});

export {getData, sendData};
