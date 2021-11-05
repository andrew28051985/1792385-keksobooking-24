import './form-activate.js';
import './util.js';
import './form.js';
import './map.js';
import {createAd} from './map.js';

const ADS_COUNT = 10;

fetch('https://24.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((ads) => {
    createAd(ads.slice(0, ADS_COUNT));
  });
