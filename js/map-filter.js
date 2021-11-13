import {debounce} from './util.js';

const mapFilters = document.querySelector('.map__filters');
const mapFeatures = mapFilters.querySelector('.map__features');
const features = mapFeatures.querySelectorAll('input');
const type = mapFilters.querySelector('#housing-type');
const price = mapFilters.querySelector('#housing-price');
const rooms = mapFilters.querySelector('#housing-rooms');
const guests = mapFilters.querySelector('#housing-guests');

const rankRpice = {
  any: {
    min: 0,
    max: 1000000,
  },
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: 1000000,
  },
};

const isChecked = (value) => {
  const condition = value.checked;
  return condition;
};

const featuresFilter = ((ads) => {
  const selectFeature = [...features].filter(isChecked);
  const feturesServerOnFilter = ads.slice().filter((ad) => selectFeature.every((feature) => {
    if (ad.offer.features && ad.offer.features.includes(feature.value)) {
      return true;
    }
  }));

  return feturesServerOnFilter;
});

const housingFilter = ((ads) => {
  const filterValue = {
    type: type.value,
    price: price.value,
    rooms: Number(rooms.value) || rooms.value,
    guests: Number(guests.value) || guests.value,
  };
  const filterValueKeys = Object.keys(filterValue);
  const housingFilterAll = ads.slice().filter((ad) => filterValueKeys.every((key) => {
    if (key === 'price') {
      if (ad.offer[key] > rankRpice[filterValue[key]].min && ad.offer.price <= rankRpice[filterValue[key]].max) {
        return true;
      }
    }
    return ad.offer[key] === filterValue[key] || filterValue[key] === 'any';
  }));
  return housingFilterAll;
});

const setFilterFormChange = (cb) => {
  mapFilters.addEventListener('change', debounce(cb));
};

export {featuresFilter, setFilterFormChange, housingFilter};
