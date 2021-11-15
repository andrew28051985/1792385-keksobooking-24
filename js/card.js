const TYPE_VISIBLE = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const isDataVerification = (data, elementDelete) => {
  if (data === undefined) {
    elementDelete.remove();
    return false;
  }
  return true;
};

const createCustomPopup = (point) => {
  const balunTemplate = document.querySelector('#card').content.querySelector('.popup');
  const balunElement = balunTemplate.cloneNode(true);
  const autor = balunElement.querySelector('.popup__avatar');
  if (isDataVerification(point.author.avatar, autor)) {
    autor.src = point.author.avatar;
  }
  const title = balunElement.querySelector('.popup__title');
  if (isDataVerification(point.offer.title, title)) {
    title.textContent = point.offer.title;
  }
  balunElement.querySelector('.popup__text--address').textContent = `${point.location.lat.toFixed(5)}, ${point.location.lng.toFixed(5)}`;
  const price = balunElement.querySelector('.popup__text--price');
  const priceMess = price.querySelector('span');
  if (isDataVerification(point.offer.price, price)) {
    price.textContent = `${point.offer.price} ${priceMess.innerText}`;
  }
  const type = balunElement.querySelector('.popup__type');
  if (isDataVerification (point.offer.type, type)) {
    type.textContent = TYPE_VISIBLE[point.offer.type];
  }
  const capacity = balunElement.querySelector('.popup__text--capacity');
  if (isDataVerification(point.offer.rooms, capacity) && isDataVerification(point.offer.guests, capacity)) {
    capacity.textContent = `${point.offer.rooms} комнаты для ${point.offer.guests} гостей`;
  }
  const time = balunElement.querySelector('.popup__text--time');
  if (isDataVerification(point.offer.checkin, time) && isDataVerification(point.offer.checkout, time)) {
    time.textContent = `Заезд после ${point.offer.checkin}, выезд до ${point.offer.checkout}`;
  }
  const futuresList = balunElement.querySelectorAll('.popup__feature');
  const futures = balunElement.querySelector('.popup__features');
  if (isDataVerification(point.offer.features, futures)) {
    futuresList.forEach((futuresListItem) => {
      const isTrue = point.offer.features.some(
        (features) => futuresListItem.classList.contains(`popup__feature--${features}`));
      if (!isTrue) {
        futuresListItem.remove();
      }
    });
  }
  const description = balunElement.querySelector('.popup__description');
  if (isDataVerification (point.offer.description, description)) {
    description.textContent = point.offer.description;
  }
  const photos = balunElement.querySelector('.popup__photos');
  if (isDataVerification(point.offer.photos, photos)) {
    const cardsSaveContainer = document.createDocumentFragment();
    const arrayPhotos = point.offer.photos;
    arrayPhotos.forEach((userPhoto) => {
      const cardPhoto = photos.querySelector('img').cloneNode(true);
      cardPhoto.src = userPhoto;
      cardsSaveContainer.append(cardPhoto);
    });
    photos.innerHTML = '';
    photos.append(cardsSaveContainer);
  }

  return balunElement;
};

export {createCustomPopup};
