import {setAddress} from './form.js';
import {createCustomPopup} from './card.js';
import {setFilterFormChange, limitArray} from './map-filter.js';

const map = L.map('map-canvas', {
  zoomControl: true,
  scrollWheelZoom: false,
});

const initMap = async () => {
  map.on('load', () => {
    setAddress(
      {
        lat: 35.68965,
        lng: 139.69528,
      },
    );
  })
    .setView({
      lat: 35.67278,
      lng: 139.69528,
    },
    12);
};
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon (
  {
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  },
);

const mainPinMarker = L.marker(
  {
    lat: 35.68965,
    lng: 139.69528,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);
mainPinMarker.on('moveend', (evt) => {
  setAddress(evt.target.getLatLng());
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = ((point) => {
  const {location} = point;
  const pinIcon = L.icon(
    {
      iconUrl: './img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    },
  );
  const marker = L.marker(
    location,
    {
      pinIcon,
    },
  );
  marker
    .addTo(markerGroup)
    .bindPopup(createCustomPopup(point));
});

const createAd = (ads) => {
  markerGroup.clearLayers();
  const filteredAdsAllMap = limitArray(ads);
  filteredAdsAllMap.forEach((point) => {
    createMarker(point);
  });
};
let allAdsData = [];
const saveAdsData = ((ads) => {
  allAdsData = ads.slice();
  return allAdsData;
});

const resetMainMarker = (() => {
  mainPinMarker.setLatLng({
    lat: 35.68965,
    lng: 139.69528,
  });
  map.setView({
    lat: 35.67278,
    lng: 139.69528,
  }, 12);
  setAddress(
    {
      lat: 35.68965,
      lng: 139.69528,
    },
  );
  createAd(allAdsData);
});

setFilterFormChange (() => {
  createAd(allAdsData);
});


export {initMap, createAd, resetMainMarker, saveAdsData};
