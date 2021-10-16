import {createAds} from './util.js';

const canvasAds = document.querySelector('.map__canvas');
const cardTemplate = document.querySelector('#card').content;
const cardClone = cardTemplate.querySelector('.popup').cloneNode(true);

const cardTitle = cardClone.querySelector('.popup__title');

const newAds = createAds();

cardTitle.textContent = newAds.offer.title;

const addCard = canvasAds.append(cardClone);

export {addCard};
