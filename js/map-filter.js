import {debounce} from './util.js';

const ADS_COUNT = 10;
const mapFeatures = document.querySelector('.map__features');
const features = mapFeatures.querySelectorAll('input');

const isChecked = (value) => {
  const condition = value.checked;
  return condition;
};

const featuresServer = ((ads) => {
  const selectFeature = [...features].filter(isChecked);
  const feturesServerOnFilter = ads.slice().filter((ad) => selectFeature.every((feature) =>
    ad.offer.features && ad.offer.features.includes(feature.value)));
  const feturesServerOnFilterTen = feturesServerOnFilter.slice(0, ADS_COUNT);
  return feturesServerOnFilterTen;
});

const setFilterFormChange = (cb) => {
  mapFeatures.addEventListener('change', debounce(cb));
};

export {featuresServer, setFilterFormChange};
