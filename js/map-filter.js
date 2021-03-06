import {debounce} from './util.js';

const ADS_COUNT = 10;

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

const setFeaturesFilter = ((ads) => {
  const selectFeature = [...features].filter(isChecked);
  const feturesServerOnFilter = ads.filter((ad) => selectFeature.every((feature) => {
    if (ad.offer.features && ad.offer.features.includes(feature.value)) {
      return true;
    }
  }));

  return feturesServerOnFilter;
});

const setHousingFilter = ((ads) => {
  const filterValue = {
    type: type.value,
    price: price.value,
    rooms: Number(rooms.value) || rooms.value,
    guests: Number(guests.value) || guests.value,
  };
  const filterValueKeys = Object.keys(filterValue);
  const setHousingFilterAll = ads.filter((ad) => filterValueKeys.every((key) => {
    if (key === 'price') {
      if (ad.offer[key] > rankRpice[filterValue[key]].min && ad.offer.price <= rankRpice[filterValue[key]].max) {
        return true;
      }
    }
    return ad.offer[key] === filterValue[key] || filterValue[key] === 'any';
  }));
  return setHousingFilterAll;
});

const filterAds = (ads) => {
  const filterAdsFeature = setFeaturesFilter(ads);
  const filterAdsAll = setHousingFilter(filterAdsFeature);
  return filterAdsAll;
};

const limitArray = (ads) => {
  const arrayAds = filterAds(ads);
  const limitAds = [];

  arrayAds.some((ad) => {
    if (limitAds.length < ADS_COUNT) {
      limitAds.push(ad);
    } else {
      return true;
    }
  });
  return limitAds;
};

const setFilterFormChange = (cb) => {
  mapFilters.addEventListener('change', debounce(cb));
};

export {setFilterFormChange, limitArray};
