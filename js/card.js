import {similarAds} from './util.js';

// Функция проверки на отсутствие данных и удаление элемента html, если данных нет
const dataVerification = (data, elementDelete) => {
  if (data === undefined) {
    elementDelete.remove();
  }
};
// Находим куда вставлять заполненную карточку объявления
const canvasAds = document.querySelector('.map__canvas');
// Находим шаблон карточки объявления
const cardTemplate = document.querySelector('#card').content;
// Данные сопоставления типов жилья для отображения в карточке
const TYPE_VISIBLE = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};
// Сохраняем массив с данными по объявлениям
const ads = similarAds();

// Запускаем генерацию карточек объявлений, проходя по массиву с данными
ads.forEach(({autor, offer}) => {
  const cardClone = cardTemplate.querySelector('.popup').cloneNode(true);
  // Аватар
  const cardAutor = cardClone.querySelector('.popup__avatar');
  dataVerification(autor.avatar, cardAutor);
  cardAutor.src = autor.avatar;
  // Заголовок
  const cardTitle = cardClone.querySelector('.popup__title');
  dataVerification(offer.title, cardTitle);
  cardTitle.textContent = offer.title;
  // Адрес
  const cardAdress = cardClone.querySelector('.popup__text--address');
  dataVerification(offer.address, cardAdress);
  cardAdress.textContent = offer.address;
  // Стоимость
  const cardPrice = cardClone.querySelector('.popup__text--price');
  const cardPriceMess = cardPrice.querySelector('span');
  dataVerification(offer.price, cardPrice);
  cardPrice.textContent = `${offer.price} ${cardPriceMess.innerText}`;
  // тип жилья
  const cardType = cardClone.querySelector('.popup__type');
  dataVerification (offer.type, cardType);
  cardType.textContent = TYPE_VISIBLE[offer.type];
  // Количество комнат и гостей
  const cardCapacity = cardClone.querySelector('.popup__text--capacity');
  dataVerification(offer.rooms, cardCapacity);
  dataVerification(offer.guests, cardCapacity);
  cardCapacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
  // Время заезда и выезда
  const cardTime = cardClone.querySelector('.popup__text--time');
  dataVerification(offer.checkin, cardTime);
  dataVerification(offer.checkout, cardTime);
  cardTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  // удобства
  const cardFuturesList = cardClone.querySelectorAll('.popup__feature');
  const cardFutures = cardClone.querySelector('.popup__features');
  dataVerification(offer.features, cardFutures);
  if (!(offer.features === undefined)) {
    cardFuturesList.forEach((cardFuturesListItem) => {
      const isTrue = offer.features.some(
        (features) => cardFuturesListItem.classList.contains(`popup__feature--${features}`));
      if (!isTrue) {
        cardFuturesListItem.remove();
      }
    });
  }
  // Описание
  const cardDescription = cardClone.querySelector('.popup__description');
  dataVerification (offer.description, cardDescription);
  cardDescription.textContent = offer.description;
  // фото
  const cardPhotos = cardClone.querySelector('.popup__photos');
  dataVerification(offer.photos, cardPhotos);
  if (!(offer.photos === undefined)) {
    const cardsSaveContainer = document.createDocumentFragment();
    const arrayPhotos = offer.photos;
    arrayPhotos.forEach((userPhoto) => {
      const cardPhoto = cardPhotos.querySelector('img').cloneNode(true);
      cardPhoto.src = userPhoto;
      cardsSaveContainer.append(cardPhoto);
    });
    cardPhotos.innerHTML = '';
    cardPhotos.append(cardsSaveContainer);
  }
  // Вставляем данные в карточку
  canvasAds.append(cardClone);
});
