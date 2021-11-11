import './form-activate.js';
import {showAlert} from './util.js';
import {sendUserFormData} from './form.js';
import {createAd, saveAdsData} from'./map.js';
import {getData} from './api.js';
import './modal.js';

const ADS_COUNT = 10;

getData((ads) => {
  saveAdsData(ads.slice(0, ADS_COUNT));
  createAd(ads.slice(0, ADS_COUNT));
}, (error) => showAlert(error));

sendUserFormData();
