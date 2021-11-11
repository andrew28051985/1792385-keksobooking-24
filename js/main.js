import {disabledForm, activateForm} from './form-activate.js';
import {showAlert} from './util.js';
import {sendUserFormData} from './form.js';
import {initMap, createAd, saveAdsData} from'./map.js';
import {getData} from './api.js';

const ADS_COUNT = 10;

disabledForm('.map__filters');
disabledForm('.ad-form');

const getSimilarAds = () => {
  getData((ads) => {
    saveAdsData(ads.slice(0, ADS_COUNT));
    createAd(ads.slice(0, ADS_COUNT));
    activateForm('.map__filters');
  }, (error) => showAlert(error));
};

initMap()
  .then(getSimilarAds)
  .then(activateForm('.ad-form'))
  .then(() => {sendUserFormData();})
  .catch(() => {showAlert('Ошибка загрузки данных с сервера. Перезагрузите страницу.');});
