import {createAds} from './util.js';

const canvasAds = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card').content;
const cardClone = cardTemplate.querySelector('.popup').cloneNode(true);

const newAds = createAds();
const cardTitle = cardClone.querySelector('.popup__title');
cardTitle.textContent = newAds.offer.title;
const cardAdress = cardClone.querySelector('.popup__text--address');
cardAdress.textContent = newAds.offer.address;
const cardPrice = cardClone.querySelector('.popup__text--price');
const cardPriceMess = cardPrice.querySelector('span');
cardPrice.textContent = `${newAds.offer.price} ${cardPriceMess.innerText}`;
// вставить тип жилья
const cardCapacity = cardClone.querySelector('.popup__text--capacity');
cardCapacity.textContent = `${newAds.offer.rooms} комнаты для ${newAds.offer.guests} гостей`;
const cardTime = cardClone.querySelector('.popup__text--time');
cardTime.textContent = `Заезд после ${newAds.offer.checkin}, выезд до ${newAds.offer.checkout}`;
// вставить удобства
const cardFuturesList = cardClone.querySelectorAll('.popup__feature');
cardFuturesList.forEach((cardFuturesListItem) => {
  const isTrue = newAds.offer.features.some(
    (features) => cardFuturesListItem.classList.contains(`popup__feature--${features}`));
  if (!isTrue) {
    cardFuturesListItem.remove();
  }
});

const cardDescription = cardClone.querySelector('.popup__description');
cardDescription.textContent = newAds.offer.description;
const cardPhotos = cardClone.querySelector('.popup__photos');
const cardPhoto = cardPhotos.querySelector('img');
cardPhoto.src = newAds.offer.photos; // ??????
const cardAutor = cardClone.querySelector('img');
cardAutor.src = newAds.autor.avatar;


const addCard = canvasAds.append(cardClone);

export {addCard};
