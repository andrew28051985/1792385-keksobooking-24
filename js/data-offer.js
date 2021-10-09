import {getRandomPositiveInt} from './random-number.js';
import {createLocation} from './data-location.js';

const MIN_PRICE = 1000;
const MAX_PRICE = 100000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 10;
const MIN_GUEST = 1;
const MAX_GUEST = 20;
const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECK_IN_OUT = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const createFeatures = () => {
  const NEW_FEATURES = [];
  FEATURES.forEach((value, index) => {
    if (getRandomPositiveInt(0, 1) === 1) {
      NEW_FEATURES.push(FEATURES[index]);
    }
  });
  if (NEW_FEATURES.length === 0) {
    NEW_FEATURES.push(FEATURES[0]);
  }
  return NEW_FEATURES;
};

const createPhotos = () => {
  const NEW_PHOTOS = [];
  PHOTOS.forEach((value, index) => {
    if (getRandomPositiveInt(0, 1) === 1) {
      NEW_PHOTOS.push(PHOTOS[index]);
    }
  });
  if (NEW_PHOTOS.length === 0) {
    NEW_PHOTOS.push(PHOTOS[0]);
  }
  return NEW_PHOTOS;
};

const createOffer = () => {
  const TITLE = 'Внимание! Супер предложение!';
  const DESCRIPTION = 'Просторная комната, светлая, удобная!';
  return {
    title: TITLE,
    // eslint-disable-next-line prefer-template
    address: createLocation().lat + ', ' + createLocation().lng,
    price: getRandomPositiveInt(MIN_PRICE, MAX_PRICE),
    type: TYPE[getRandomPositiveInt(0, TYPE.length - 1)],
    rooms: getRandomPositiveInt(MIN_ROOMS, MAX_ROOMS),
    guests: getRandomPositiveInt(MIN_GUEST, MAX_GUEST),
    checkin: CHECK_IN_OUT[getRandomPositiveInt(0, CHECK_IN_OUT.length-1)],
    checkout: CHECK_IN_OUT[getRandomPositiveInt(0, CHECK_IN_OUT.length-1)],
    features: createFeatures(),
    description: DESCRIPTION,
    photos: createPhotos(),
  };
};

export {createOffer};
