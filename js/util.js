import {createAutor} from './data-autor.js';
import {createLocation} from './data-location.js';
import {createOffer} from './data-offer.js';

const createAds = () => {
  const AUTOR = createAutor();
  return {
    autor: AUTOR,
    offer: createOffer(),
    location: createLocation(),
  };
};

export {createAds};
