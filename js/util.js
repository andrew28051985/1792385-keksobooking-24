import {createAutor, createLocation, createOffer} from './data.js';

const createAds = () => {
  const AUTOR = createAutor();
  return {
    autor: AUTOR,
    offer: createOffer(),
    location: createLocation(),
  };
};

export {createAds};
