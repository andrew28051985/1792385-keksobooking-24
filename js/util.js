import {createAutor, createLocation, createOffer} from './data.js';

const SIMILAR_ADS_COUNT = 1;

const createAds = () => {
  const ads = {
    autor: createAutor(),
    offer: createOffer(),
    location: createLocation(),
  };
  return ads;
};

const similarAds = () => Array.from({length: SIMILAR_ADS_COUNT}, createAds);

export {createAds, similarAds};
