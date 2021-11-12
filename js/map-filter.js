import {formFilters} from './form.js';

const mapFeatures = formFilters.querySelector('.map__features');
const features = mapFeatures.querySelectorAll('input');

const isChecked = (value) => {
  const condition = value.checked;
  return condition;
};

mapFeatures.addEventListener('change', () => {
  const selectFeature = [...features].filter(isChecked);

  //console.log(selectFeature);
});

const featuresServer = ((ads) => {
  const feturesServerOnFilter = ads.filter((value) =>
    value.offer.features === 'wifi');
  return feturesServerOnFilter;
});

export {featuresServer};
