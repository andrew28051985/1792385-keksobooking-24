//Получение данных с сервера
const getData = ((onSuccess, onFail) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')  //адрес сервера
    .then((response) => {             //проверяем полученные данные от сервера
      if (response.ok) {              //если есть ошибки при загрузке данных
        return response;              //если нет, то возвращаем данные
      }
      throw new Error('Ошибка загрузки данных с сервера. Перезагрузите страницу.');  //иначеч показываем сообщение об ошибке
    })
    .then((response) => response.json())     // полученные данные преобразуем из JSON в объект
    .then((ads) => {
      onSuccess(ads);//.slice(0, ADS_COUNT));  //получив объект с данными отрисовываем на карте
    })
    .catch((error) => {         //если есть ошибки в запросе, то показываем сообщение об ошибке
      onFail(error);        //функция показа сообщения об ошибке
    });
});

//Отправка данных на сервер
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
