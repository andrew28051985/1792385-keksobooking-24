import {getRandomPositiveFloat} from './random-number.js';

const MIN_LAT = 35.65000;
const MAX_LAT = 35.70000;
const MIN_LNG = 139.70000;
const MAX_LNG = 139.80000;
const RANGE_FLOAT = 5;

const createLocation = () => {
  const NUMBER_LAT = getRandomPositiveFloat(MIN_LAT, MAX_LAT, RANGE_FLOAT);
  const NUMBER_LNG = getRandomPositiveFloat(MIN_LNG, MAX_LNG, RANGE_FLOAT);
  return {
    lat: NUMBER_LAT,
    lng: NUMBER_LNG,
  };
};

export {createLocation};
