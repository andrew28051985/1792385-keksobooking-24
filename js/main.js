import {createAds} from './util.js';
import {addCard} from './card.js';

const SIMILAR_ADS_COUNT = 10;
const similarAds = Array.from({length: SIMILAR_ADS_COUNT}, createAds);

// eslint-disable-next-line no-console
console.log(similarAds);
// eslint-disable-next-line no-console
console.log(addCard);
