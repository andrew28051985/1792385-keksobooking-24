import {createAutor, createLocation, createOffer} from './data.js';

// Функция проверки на отсутствие данных и удаление элемента html, если данных нет
const dataVerification = (data, elementDelete) => {
  if (data === undefined) {
    elementDelete.remove();
    return false;
  }
  return true;
};
// Данные сопоставления типов жилья для отображения в карточке
const TYPE_VISIBLE = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};
//Создаем массив с данными для генерации обычных меток
const points = [
  {
    autor: createAutor().avatar,
    title: createOffer().title,
    lat: createLocation().lat,
    lng: createLocation().lng,
    price: createOffer().price,
    type: createOffer().type,
    features: createOffer().features,
    description: createOffer().description,
    photos: createOffer().photos,
  },
  {
    autor: createAutor().avatar,
    title: createOffer().title,
    lat: createLocation().lat,
    lng: createLocation().lng,
    price: createOffer().price,
    type: createOffer().type,
    rooms: createOffer().rooms,
    guests: createOffer().guests,
    checkin: createOffer().checkin,
    checkout: createOffer().checkout,
    features: createOffer().features,
    description: createOffer().description,
  },
  {
    autor: createAutor().avatar,
    title: createOffer().title,
    lat: createLocation().lat,
    lng: createLocation().lng,
    price: createOffer().price,
    type: createOffer().type,
    rooms: createOffer().rooms,
    guests: createOffer().guests,
    checkin: createOffer().checkin,
    checkout: createOffer().checkout,
    features: createOffer().features,
  },
  {
    autor: createAutor().avatar,
    title: createOffer().title,
    lat: createLocation().lat,
    lng: createLocation().lng,
    price: createOffer().price,
    type: createOffer().type,
    rooms: createOffer().rooms,
    guests: createOffer().guests,
    checkin: createOffer().checkin,
    checkout: createOffer().checkout,
    features: createOffer().features,
    description: createOffer().description,
    photos: createOffer().photos,
  },
  {
    autor: createAutor().avatar,
    title: createOffer().title,
    lat: createLocation().lat,
    lng: createLocation().lng,
    price: createOffer().price,
    type: createOffer().type,
    rooms: createOffer().rooms,
    guests: createOffer().guests,
    checkin: createOffer().checkin,
    checkout: createOffer().checkout,
    features: createOffer().features,
    description: createOffer().description,
    photos: createOffer().photos,
  },
];
//Функция генерации шаблона карточки c данными объявления для показа в балуне
const createCustomPopup = (point) => {
  const balunTemplate = document.querySelector('#card').content.querySelector('.popup');  //Находим шаблон объявления
  const balunElement = balunTemplate.cloneNode(true); //Копируем шаблон

  //Заполняем шаблон данными
  //Аватар
  const autor = balunElement.querySelector('.popup__avatar'); //Находим аватар
  if (dataVerification(point.autor, autor)) {    //Если в данных есть аватар, то заполняем его данными, если нет, то удаляем элемент из разметки
    autor.src = point.autor;   //Заполняем данными элемент аватара
  }
  //Заголовок
  const title = balunElement.querySelector('.popup__title');
  if (dataVerification(point.title, title)) {
    title.textContent = point.title;
  }
  //Адрес
  balunElement.querySelector('.popup__text--address').textContent = `${point.lat}, ${point.lng}`;
  //Стоимость
  const price = balunElement.querySelector('.popup__text--price');
  const priceMess = price.querySelector('span');
  if (dataVerification(point.price, price)) {
    price.textContent = `${point.price} ${priceMess.innerText}`;
  }
  //Тип жилья
  const type = balunElement.querySelector('.popup__type');
  if (dataVerification (point.type, type)) {
    type.textContent = TYPE_VISIBLE[point.type];
  }
  // Количество комнат и гостей
  const capacity = balunElement.querySelector('.popup__text--capacity');
  if (dataVerification(point.rooms, capacity) && dataVerification(point.guests, capacity)) {
    capacity.textContent = `${point.rooms} комнаты для ${point.guests} гостей`;
  }
  // Время заезда и выезда
  const time = balunElement.querySelector('.popup__text--time');
  if (dataVerification(point.checkin, time) && dataVerification(point.checkout, time)) {
    time.textContent = `Заезд после ${point.checkin}, выезд до ${point.checkout}`;
  }
  // удобства
  const futuresList = balunElement.querySelectorAll('.popup__feature');
  const futures = balunElement.querySelector('.popup__features');
  if (dataVerification(point.features, futures)) {
    futuresList.forEach((futuresListItem) => {
      const isTrue = point.features.some(
        (features) => futuresListItem.classList.contains(`popup__feature--${features}`));
      if (!isTrue) {
        futuresListItem.remove();
      }
    });
  }
  // Описание
  const description = balunElement.querySelector('.popup__description');
  if (dataVerification (point.description, description)) {
    description.textContent = point.description;
  }
  // фото
  const photos = balunElement.querySelector('.popup__photos');
  if (dataVerification(point.photos, photos)) {
    const cardsSaveContainer = document.createDocumentFragment();
    const arrayPhotos = point.photos;
    arrayPhotos.forEach((userPhoto) => {
      const cardPhoto = photos.querySelector('img').cloneNode(true);
      cardPhoto.src = userPhoto;
      cardsSaveContainer.append(cardPhoto);
    });
    photos.innerHTML = '';
    photos.append(cardsSaveContainer);
  }

  return balunElement;  //Возвращаем, заполненную данными, карточку объявления
};

export {points, createCustomPopup};
