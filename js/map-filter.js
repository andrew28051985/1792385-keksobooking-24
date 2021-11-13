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

//Функция определения выбранного чекбокса
const isChecked = (value) => {
  const condition = value.checked;
  return condition;
};

//Фильтрация объявлений по улучшениям (по полям features)
const featuresFilter = ((ads) => {
  //Из коллекции элементов чекбоксов делаем массив и отфильтровываем только выбранные
  const selectFeature = [...features].filter(isChecked);
  //Копируем принимаемый с сервера массив данных и фильтруем его по выбранным чекбоксам
  const feturesServerOnFilter = ads.slice().filter((ad) => selectFeature.every((feature) => {
    if (ad.offer.features && ad.offer.features.includes(feature.value)) {
      return true;
    }
  }));

  return feturesServerOnFilter;
});

//Фильтрация объявлений по полям housing
const housingFilter = ((ads) => {
  //Создаем объект с типами и значениями полей фильтров
  const filterValue = {
    type: type.value,
    price: price.value,
    rooms: Number(rooms.value) || rooms.value,
    guests: Number(guests.value) || guests.value,
  };
  //Создаем массив с ключами объекта filterValue
  const filterValueKeys = Object.keys(filterValue);
  //Копируем массив с данными от сервера, фильтруем его по соответствию условий
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
//Обработчик фильтров по изменению полей сфункцией устранения "дребезга"
const setFilterFormChange = (cb) => {
  mapFilters.addEventListener('change', debounce(cb));
};

export {featuresFilter, setFilterFormChange, housingFilter};
