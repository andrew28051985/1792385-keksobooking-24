import {createAds} from './util.js';

const SIMILAR_ADS_COUNT = 10;
const similarAds = Array.from({length: SIMILAR_ADS_COUNT}, createAds);

// eslint-disable-next-line no-console
console.log(similarAds);
