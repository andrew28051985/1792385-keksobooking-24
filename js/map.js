import {activateForm} from './form-activate.js';
import {address} from './form.js';
import {createLocation} from './data.js';

//Создаем карту
const map = L.map('map-canvas')
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
  12);
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
// Создаем иконку обычной метки
const pinIcon = L.icon(
  {
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  },
);
//Создаем массив с координатами
const points = [
  {
    coordinate: createLocation(),
    icon: pinIcon,
  },
  {
    coordinate: createLocation(),
    icon: pinIcon,
  },
  {
    coordinate: createLocation(),
    icon: pinIcon,
  },
  {
    coordinate: createLocation(),
    icon: pinIcon,
  },
  {
    coordinate: createLocation(),
    icon: pinIcon,
  },
];
//создаем обычные метки в цикле
points.forEach(({coordinate, icon}) => {
  const marker = L.marker(
    coordinate,
    {
      icon,
    },
  );
  marker.addTo(map);
});

export {mainMarkerLatLng};
