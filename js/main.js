import {disabledForm, activateForm} from './form-activate.js';
import {showAlert} from './util.js';
import {sendUserFormData} from './form.js';
import {initMap, createAd, saveAdsData} from'./map.js';
import {getData} from './api.js';
import './foto.js';

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
