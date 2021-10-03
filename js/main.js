const getRandomPositiveInt = (from, to) => {
  const lower = Math.ceil(Math.min(Math.abs(from), Math.abs(to)));
  const upper = Math.floor(Math.max(Math.abs(from), Math.abs(to)));
  const resultInt = Math.floor(Math.random() * (upper - lower + 1) + lower);
  return resultInt;
};
const getRandomPositiveFloat = (from, to, range) => {
  const lower = Math.min(Math.abs(from), Math.abs(to));
  const upper = Math.max(Math.abs(from), Math.abs(to));
  const resultFloat = Math.random() * (upper - lower ) + lower;
  return resultFloat.toFixed(range);
};

const MAX_NUMBER_AUTOR = 10;
const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const RANGE_FLOAT = 5;
const SIMILAR_ADS_COUNT = 10;
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

const createAutor = () => {
  let numberAutor = getRandomPositiveInt(1, MAX_NUMBER_AUTOR);
  if (String(numberAutor).length === 1) {
    // eslint-disable-next-line prefer-template
    numberAutor = '0' + numberAutor;
  }
  return {
    // eslint-disable-next-line prefer-template
    avatar: 'img/avatars/user' + numberAutor + '.png',
  };
};

const createLocation = () => {
  const NUMBER_LAT = getRandomPositiveFloat(MIN_LAT, MAX_LAT, RANGE_FLOAT);
  const NUMBER_LNG = getRandomPositiveFloat(MIN_LNG, MAX_LNG, RANGE_FLOAT);
  return {
    lat: NUMBER_LAT,
    lng: NUMBER_LNG,
  };
};

const createOffer = () => {
  const TITLE = 'Внимание! Супер предложение!';
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
    features: FEATURES.length-getRandomPositiveInt(0, FEATURES.length-1),
  };
};
const createAds = () => {
  const AUTOR = createAutor();
  return {
    autor: AUTOR,
    offer: createOffer(),
    location: createLocation(),
  };
};

const similarAds = Array.from({length: SIMILAR_ADS_COUNT}, createAds);

// eslint-disable-next-line no-console
console.log(createAds);
// eslint-disable-next-line no-console
console.log(similarAds);
