import {activateForm} from './form-activate.js';
import {address} from './form.js';
import {createCustomPopup} from './card.js';

//Создаем карту
const map = L.map('map-canvas', {
  zoomControl: true,
  scrollWheelZoom: false,
})
//После загрузки карты разблокируем формы
  .on('load', () => {
    activateForm('.map__filters');
    activateForm('.ad-form');
  })
//Устанавливаем координаты центра карты
  .setView({
    lat: 35.68965,
    lng: 139.69528,
  },
  //Устанавливаем масштаб карты
  13);
//Добавляем на карту саму карту от www.openstreetmap.org
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', //карта
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', // авторство
  },
).addTo(map); //добавляем на карту карту

//Создаем иконку главного маркера
const mainPinIcon = L.icon (
  {
    iconUrl: './img/main-pin.svg',  //картинка маркера
    iconSize: [52, 52],             //размеры маркера
    iconAnchor: [26, 52],           //нижний кончик маркера
  },
);
//устанавливаем главный маркер на карту
const mainPinMarker = L.marker(
  {
    lat: 35.68965,                   // координы установки маркера
    lng: 139.69528,
  },
  {
    draggable: true,                //возможность перетаскивать маркер
    icon: mainPinIcon,              //иконка маркера
  },
);
mainPinMarker.addTo(map);           //добавляем главный маркер на карту
//Переменная для передачи координат главного маркера в форму
const mainMarkerLatLng =
mainPinMarker.on('moveend', (evt) => {         //Событие перетаскивания маркера
  const coordinate = evt.target.getLatLng();   //Новые координаты маркера после установки
  address.value = `${(coordinate.lat).toFixed(5)}, ${(coordinate.lng).toFixed(5)}`;                                      //Записываем в форму координаты
});

//Создаем обтдельный слой для меток объявлений
const markerGroup = L.layerGroup().addTo(map);

//Функция для генерации обычных меток
const createMarker = ((point) => {
  const {location} = point;
  // Создаем иконку обычной метки
  const pinIcon = L.icon(
    {
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    },
  );
  const marker = L.marker(                   //Выбираем данные
    location,
    {
      pinIcon,
    },
  );
  marker
    .addTo(markerGroup)                             //Размещаем на карте
    .bindPopup(createCustomPopup(point));   //Добаляем балун(попап с объявлением) по клику на метке
});

//Функция создания меток объявлений
const createAd = (ads) => {
  markerGroup.clearLayers();
  ads.forEach((point) => {
    createMarker(point);
  });
};

//Массив для копирования данных с сервера
let allAdsData = [];
//Функция копирования массива с сервера в массив allAdsData
const saveAdsData = ((adsList) => {
  allAdsData = adsList.slice();
});

//Функция возврата в первоначальное положение главного маркера и меток объявлений (для закрытия балуна)
const resetMainMarker = (() => {
  mainPinMarker.setLatLng({
    lat: 35.68965,
    lng: 139.69528,
  });
  map.setView({
    lat: 35.68965,
    lng: 139.69528,
  }, 13);
  createAd(allAdsData);
});

export {mainMarkerLatLng, createAd, resetMainMarker, saveAdsData};
