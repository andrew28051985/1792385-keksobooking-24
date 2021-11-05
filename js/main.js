import './form-activate.js';
import './util.js';
import './form.js';
import './map.js';
import {createAd} from './map.js';

fetch('https://24.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((ads) => {
    createAd(ads);
  });
