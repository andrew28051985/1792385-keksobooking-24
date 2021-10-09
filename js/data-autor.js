import {getRandomPositiveInt} from './random-number.js';

const MAX_NUMBER_AUTOR = 10;

const createAutor = () => {
  let numberAutor = getRandomPositiveInt(1, MAX_NUMBER_AUTOR);
  if (String(numberAutor).length === 1) {
    // eslint-disable-next-line prefer-template
    numberAutor = '0' + numberAutor;
  }
  return {
    // eslint-disable-next-line prefer-template
    avatar: 'img/avatars/user' + numberAutor + '.png',
  };
};

export {createAutor};
