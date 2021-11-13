// Версия проекта с комментариями от 13.11.2021

import {disabledForm, activateForm} from './form-activate.js';
import {showAlert} from './util.js';
import {sendUserFormData} from './form.js';
import {initMap, createAd, saveAdsData} from'./map.js';
import {getData} from './api.js';

disabledForm('.map__filters');
disabledForm('.ad-form');

const getSimilarAds = () => {
  getData((ads) => {
    saveAdsData(ads);
    createAd(ads);
    activateForm('.map__filters');
  }, (error) => showAlert(error));
};

initMap()
  .then(getSimilarAds)
  .then(activateForm('.ad-form'))
  .then(() => {sendUserFormData();})
  .catch(() => {showAlert('Ошибка загрузки данных с сервера. Перезагрузите страницу.');});
