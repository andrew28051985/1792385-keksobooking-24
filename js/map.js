import {setAddress} from './form.js';
import {createCustomPopup} from './card.js';
import {setFilterFormChange, limitArray} from './map-filter.js';

const LOCATION_MAIN_MARKER = {
  lat: 35.68965,
  lng: 139.69528,
};
const MAIN_MARKER_URL_SIZE_ICON = {
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};
const ADS_MARKER_URL_SIZE_ICON = {
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};
const SET_VIEW_MAP = {
  lat: 35.67278,
  lng: 139.69528,
};

const map = L.map('map-canvas', {
  zoomControl: true,
  scrollWheelZoom: false,
});

const initMap = async () => {
  map.on('load', () => {
    setAddress(
      LOCATION_MAIN_MARKER,
    );
  })
    .setView(
      SET_VIEW_MAP, 12);
};
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon (MAIN_MARKER_URL_SIZE_ICON);

const mainPinMarker = L.marker(
  LOCATION_MAIN_MARKER,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);
mainPinMarker.addTo(map);
mainPinMarker.on('move', (evt) => {
  setAddress(evt.target.getLatLng());
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = ((point) => {
  const {location} = point;
  const pinIcon = L.icon(ADS_MARKER_URL_SIZE_ICON);
  const marker = L.marker(
    location,
    {
      icon: pinIcon,
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
  mainPinMarker.setLatLng(LOCATION_MAIN_MARKER);
  map.setView(SET_VIEW_MAP, 12);
  setAddress(LOCATION_MAIN_MARKER);
  createAd(allAdsData);
});

setFilterFormChange (() => {
  createAd(allAdsData);
});


export {initMap, createAd, resetMainMarker, saveAdsData};
