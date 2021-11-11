import './form-activate.js';
import {showAlert} from './util.js';
import {sendUserFormData} from './form.js';
import {createAd} from'./map.js';
import {getData} from './api.js';
import './modal.js';

const ADS_COUNT = 10;

getData((ads) => createAd(ads.slice(0, ADS_COUNT)), () => showAlert());
sendUserFormData();
